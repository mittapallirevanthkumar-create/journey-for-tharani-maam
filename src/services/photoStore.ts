import type { PhotoItem } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { indexedDbStore } from './indexedDbStore';

const baseUrl = import.meta.env.BASE_URL || '/';
const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const isMediaVideo = (item?: PhotoItem | null): boolean => {
  if (!item) return false;
  if (item.mediaType === 'video') return true;
  if (!item.url) return false;
  return item.url.startsWith('data:video/') || /\.(mp4|webm|ogg|mov|m4v|mkv|avi|3gp|flv|wmv)($|\?)/i.test(item.url);
};

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'static-1',
    url: `${cleanBaseUrl}photos/20260103_103813.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-2',
    url: `${cleanBaseUrl}photos/20260110_100859(1).jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-3',
    url: `${cleanBaseUrl}photos/20260124_153040.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-4',
    url: `${cleanBaseUrl}photos/20260127_150517.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-5',
    url: `${cleanBaseUrl}photos/20260404_155802.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-6',
    url: `${cleanBaseUrl}photos/AISelect_20260411_135609_Gallery.jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-7',
    url: `${cleanBaseUrl}photos/IMG-20260107-WA0116 (1).jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-8',
    url: `${cleanBaseUrl}photos/IMG-20260122-WA0038.jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-9',
    url: `${cleanBaseUrl}photos/IMG-20260122-WA0124.jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-10',
    url: `${cleanBaseUrl}photos/IMG-20260705-WA0001(1).jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-11',
    url: `${cleanBaseUrl}photos/IMG_1856.jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-12',
    url: `${cleanBaseUrl}photos/IMG_2569.JPG`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-13',
    url: `${cleanBaseUrl}photos/IMG_2861.JPG`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-14',
    url: `${cleanBaseUrl}photos/IMG_3100(1) (1).jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-15',
    url: `${cleanBaseUrl}photos/IMG_3103(3).jpg`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  },
  {
    id: 'static-16',
    url: `${cleanBaseUrl}photos/VID-20260109-WA0001.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-17',
    url: `${cleanBaseUrl}photos/VID_20260110_183232_058_bsl.mp4`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'video'
  },
  {
    id: 'static-18',
    url: `${cleanBaseUrl}photos/file_00000000427081f88c0a02f75e87e3d8.png`,
    caption: '',
    date: '',
    description: '',
    mediaType: 'image'
  }
];

let memoryCache: PhotoItem[] | null = null;

export const photoStore = {
  async getPhotos(): Promise<PhotoItem[]> {
    if (memoryCache && memoryCache.length > 0) {
      return memoryCache;
    }

    let userPhotos: PhotoItem[] = [];
    try {
      const fromDb = await indexedDbStore.getAll();
      if (fromDb && fromDb.length > 0) {
        userPhotos = fromDb;
      }
    } catch (e) {
      console.warn('IndexedDB fetch failed:', e);
    }

    if (userPhotos.length === 0) {
      const saved = localStorage.getItem('tharani_maam_journey_photos');
      if (saved) {
        try {
          userPhotos = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse local photos', e);
        }
      }
    }

    // Combine INITIAL_PHOTOS and userPhotos without duplicates (keyed by URL or ID)
    const map = new Map<string, PhotoItem>();
    INITIAL_PHOTOS.forEach(p => map.set(p.url, p));
    userPhotos.forEach(p => map.set(p.url || p.id, p));

    const combined = Array.from(map.values());
    memoryCache = combined;
    return combined;
  },

  getPhotosSync(): PhotoItem[] {
    return memoryCache || INITIAL_PHOTOS;
  },

  async uploadPhoto(file: File, caption: string, date?: string, description?: string): Promise<PhotoItem> {
    let processedFile: File | Blob = file;
    const filename = file.name.toLowerCase();
    const isHeic = filename.endsWith('.heic') || filename.endsWith('.heif') || file.type.includes('heic') || file.type.includes('heif');

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

    await indexedDbStore.add(newPhoto);
    const current = await this.getPhotos();
    const updated = [newPhoto, ...current.filter(p => p.id !== newPhoto.id)];
    memoryCache = updated;

    try {
      localStorage.setItem('tharani_maam_journey_photos', JSON.stringify(updated.slice(0, 10)));
    } catch (e) {
      console.warn('localStorage save skipped:', e);
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

