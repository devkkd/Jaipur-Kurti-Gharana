'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

export default function MultipleImageUpload({ 
  images = [], 
  onChange, 
  folder = 'avanta/products',
  maxImages = 10,
  placeholder = 'Upload images'
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('images', file); // Changed from 'file' to 'images' for R2 API

    try {
      const response = await fetch('/api/admin/products/upload-image', { // Changed to R2 endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errData = null;
        try {
          errData = await response.json();
        } catch (e) {
          // ignore
        }
        console.error('Upload failed:', errData || response.statusText);
        const message = (errData && errData.error) || `Upload failed: ${response.status} ${response.statusText}`;
        throw new Error(message);
      }

      const data = await response.json();
      
      // R2 API returns { success: true, urls: [...] }
      if (data.success && data.urls && data.urls.length > 0) {
        return data.urls[0];
      } else {
        throw new Error('Upload failed: No URL returned');
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleFileSelect = async (files) => {
    setUploadError('');
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const newImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadError(`File ${file.name} is not an image`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError(`File ${file.name} is too large (max 5MB)`);
          continue;
        }

        const imageUrl = await uploadToCloudinary(file);
        newImages.push(imageUrl);
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
        setUploadError('');
      }
    } catch (error) {
      const msg = error?.message || 'Failed to upload images. Please try again.';
      setUploadError(msg);
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Existing Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-3">
                {images.length > 0 ? <Plus className="h-6 w-6 text-gray-400" /> : <ImageIcon className="h-6 w-6 text-gray-400" />}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {images.length > 0 ? 'Add more images' : placeholder}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Drag and drop images here, or click to select multiple
              </p>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2">
                <Upload size={16} />
                Choose Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}

      {/* Info and Error Messages */}
      <div className="space-y-2">
        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Supported formats: JPG, PNG, GIF. Max size: 5MB each</span>
          <span>{images.length}/{maxImages} images</span>
        </div>
      </div>
    </div>
  );
}