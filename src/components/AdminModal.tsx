import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '../types';
import { photoStore } from '../services/photoStore';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { X, Upload, Trash2, Edit3, ShieldCheck, Lock, Sparkles, Check } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onPhotosUpdated: (photos: PhotoItem[]) => void;
  isAuthenticated: boolean;
  onLogin: (password: string) => boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  photos,
  onPhotosUpdated,
  isAuthenticated,
  onLogin
}) => {
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passcode);
    if (!success) {
      setLoginError('Invalid Passcode! Please try again.');
    } else {
      setLoginError('');
      setPasscode('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await photoStore.uploadPhoto(selectedFile, caption, date, description);
      const updated = await photoStore.getPhotos();
      onPhotosUpdated(updated);

      // Reset Form
      setSelectedFile(null);
      setPreviewUrl('');
      setCaption('');
      setDate('');
      setDescription('');
      audioEngine.playClick();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory photo?')) {
      const updated = await photoStore.deletePhoto(id);
      onPhotosUpdated(updated);
      audioEngine.playClick();
    }
  };

  const handleStartEdit = (photo: PhotoItem) => {
    setEditingId(photo.id);
    setEditCaption(photo.caption);
  };

  const handleSaveEdit = async (id: string) => {
    const updated = await photoStore.updatePhoto(id, { caption: editCaption });
    onPhotosUpdated(updated);
    setEditingId(null);
    audioEngine.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl bg-[#1e130c] border-2 border-[#d4af37] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 md:p-8 text-[#fdfbf7] flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
            <h3 className="font-cinzel text-xl md:text-2xl text-[#d4af37] font-bold">
              Admin Gallery Control Panel
            </h3>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[#4a3728]/50 text-[#f5ebe0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Form if not Authenticated */}
        {!isAuthenticated ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6 max-w-md mx-auto py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl text-[#fdfbf7] font-bold">Admin Authentication</h4>
              <p className="font-serif text-xs text-[#8c6d53] mt-1">
                Enter your admin passcode to manage photos for Tharani Ma'am's gallery.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#2c1e16] border border-[#8c6d53]/50 text-center font-mono text-[#d4af37] focus:outline-none focus:border-[#d4af37]"
              />
              {loginError && <p className="text-xs text-red-400 font-serif">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-base shadow-lg transition"
            >
              Authenticate Admin Access
            </button>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8">
            {/* Storage Status */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#2c1e16] border border-[#8c6d53]/40 text-xs">
              <span className="flex items-center gap-2 font-serif text-[#f5ebe0]">
                <Sparkles className="w-4 h-4 text-[#d4af37]" /> Storage Engine:
              </span>
              <span className={`font-semibold ${isSupabaseConfigured ? 'text-green-400' : 'text-[#d4af37]'}`}>
                {isSupabaseConfigured ? 'Supabase Storage Active' : 'Persistent Storage Active'}
              </span>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUploadSubmit} className="p-5 rounded-2xl bg-[#2c1e16] border border-[#8c6d53]/40 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#d4af37] flex items-center gap-2">
                <Upload className="w-5 h-5" /> Add New Memory Photo or Video
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-[#8c6d53] mb-1">Select Media File (Any Format: JPG, PNG, HEIC, WEBP, MP4, MOV, etc.)</label>
                  <input
                    type="file"
                    accept="*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-[#f5ebe0] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-serif file:bg-[#4a3728] file:text-[#d4af37] hover:file:bg-[#2c1e16]"
                    required
                  />
                  {previewUrl && (
                    selectedFile?.type.startsWith('video/') ? (
                      <video src={previewUrl} controls className="mt-3 h-24 rounded-lg object-cover border border-[#d4af37]/40" />
                    ) : (
                      <img src={previewUrl} alt="Preview" className="mt-3 h-24 rounded-lg object-cover border border-[#d4af37]/40" />
                    )
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-serif text-[#8c6d53] mb-1">Caption (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Guidance & Support"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#120c08] border border-[#8c6d53]/40 text-xs text-[#fdfbf7] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif text-[#8c6d53] mb-1">Date (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Teachers' Day 2024"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#120c08] border border-[#8c6d53]/40 text-xs text-[#fdfbf7] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif text-[#8c6d53] mb-1">Description (Optional)</label>
                <textarea
                  placeholder="Short note or memory story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#120c08] border border-[#8c6d53]/40 text-xs text-[#fdfbf7] focus:outline-none focus:border-[#d4af37] h-16 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-sm transition"
              >
                {isUploading ? 'Uploading Photo...' : 'Upload Memory Photo'}
              </button>
            </form>

            {/* Existing Photos List */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#fdfbf7]">
                Manage Existing Photos ({photos.length})
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#2c1e16] border border-[#8c6d53]/30 gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {photo.mediaType === 'video' || photo.url.startsWith('data:video/') ? (
                        <video src={photo.url} className="w-12 h-12 rounded-lg object-cover border border-[#8c6d53]/40" />
                      ) : (
                        <img src={photo.url} alt={photo.caption} className="w-12 h-12 rounded-lg object-cover border border-[#8c6d53]/40" />
                      )}
                      <div>
                        {editingId === photo.id ? (
                          <input
                            type="text"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            className="px-2 py-1 text-xs bg-[#120c08] border border-[#d4af37] rounded text-white"
                          />
                        ) : (
                          <span className="font-serif text-sm font-semibold text-[#fdfbf7] block">{photo.caption}</span>
                        )}
                        <span className="font-serif text-xs text-[#8c6d53]">{photo.date || 'No Date'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {editingId === photo.id ? (
                        <button
                          onClick={() => handleSaveEdit(photo.id)}
                          className="p-2 rounded bg-green-700 hover:bg-green-600 text-white"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(photo)}
                          className="p-2 rounded bg-[#4a3728] hover:bg-[#8c6d53] text-white"
                          title="Edit Caption"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="p-2 rounded bg-red-900/60 hover:bg-red-800 text-white"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
