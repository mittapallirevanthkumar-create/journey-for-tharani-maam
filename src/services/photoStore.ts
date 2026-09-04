import type { PhotoItem } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { indexedDbStore } from './indexedDbStore';

const INITIAL_PHOTOS: PhotoItem[] = [];
let memoryCache: PhotoItem[] | null = null;

export const photoStore = {
  async getPhotos(): Promise<PhotoItem[]> {
    if (memoryCache && memoryCache.length > 0) {
      return memoryCache;
    }

    try {
      const fromDb = await indexedDbStore.getAll();
      if (fromDb && fromDb.length > 0) {
        memoryCache = fromDb;
        return fromDb;
      }
    } catch (e) {
      console.warn('IndexedDB fetch failed:', e);
    }

    const saved = localStorage.getItem('tharani_maam_journey_photos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        memoryCache = parsed;
        return parsed;
      } catch (e) {
        console.error('Failed to parse local photos', e);
      }
    }

    memoryCache = INITIAL_PHOTOS;
    return INITIAL_PHOTOS;
  },

  getPhotosSync(): PhotoItem[] {
    return memoryCache || INITIAL_PHOTOS;
  },

  async uploadPhoto(file: File, caption: string, date?: string, description?: string): Promise<PhotoItem> {
    let processedFile: File | Blob = file;
    const filename = file.name.toLowerCase();
    const isHeic = filename.endsWith('.heic') || filename.endsWith('.heif') || file.type.includes('heic') || file.type.includes('heif');

    // HEIC Conversion if needed
    if (isHeic) {
      try {
        const heic2any = (await import('heic2any')).default;
        const converted = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.85
        });
        processedFile = Array.isArray(converted) ? converted[0] : converted;
      } catch (e) {
        console.warn('HEIC conversion failed, using direct file:', e);
      }
    }

    let photoUrl = '';

    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = processedFile.type.split('/')[1] || 'jpeg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `photos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('journey-photos')
          .upload(filePath, processedFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('journey-photos')
          .getPublicUrl(filePath);

        photoUrl = data.publicUrl;
      } catch (err) {
        console.warn('Supabase upload failed, using Data URL:', err);
        photoUrl = await this.fileToBase64(processedFile);
      }
    } else {
      photoUrl = await this.fileToBase64(processedFile);
    }

    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|mov|m4v|mkv|avi|3gp|flv|wmv)$/i.test(file.name);

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: photoUrl,
      caption: caption || '',
      date: date || '',
      description: description || '',
      mediaType: isVideo ? 'video' : 'image'
    };

    // Save to IndexedDB & Memory Cache
    await indexedDbStore.add(newPhoto);
    const current = await this.getPhotos();
    const updated = [newPhoto, ...current.filter(p => p.id !== newPhoto.id)];
    memoryCache = updated;

    // Fallback to localStorage for small items
    try {
      localStorage.setItem('tharani_maam_journey_photos', JSON.stringify(updated.slice(0, 10)));
    } catch (e) {
      console.warn('localStorage save skipped (using IndexedDB):', e);
    }

    return newPhoto;
  },

  async deletePhoto(id: string): Promise<PhotoItem[]> {
    await indexedDbStore.delete(id);
    const current = await this.getPhotos();
    const updated = current.filter(p => p.id !== id);
    memoryCache = updated;

    try {
      localStorage.setItem('tharani_maam_journey_photos', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    return updated;
  },

  async updatePhoto(id: string, updates: Partial<PhotoItem>): Promise<PhotoItem[]> {
    await indexedDbStore.update(id, updates);
    const current = await this.getPhotos();
    const updated = current.map(p => p.id === id ? { ...p, ...updates } : p);
    memoryCache = updated;
    return updated;
  },

  fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
};
