'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function CloudinaryUpload({ 
  value, 
  onChange, 
  folder = 'avanta/subcategories',
  placeholder = 'Upload image'
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('images', file); // Changed to 'images' for R2 API

    try {
      const response = await fetch('/api/admin/products/upload-image', { // Changed to R2 endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Try to read JSON body for detailed error
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

  const handleFileSelect = async (file) => {
    setUploadError('');
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      onChange(imageUrl);
      setUploadError('');
    } catch (error) {
      const msg = error?.message || 'Failed to upload image. Please try again.';
      setUploadError(msg);
      // Also show a brief alert for visibility
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
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

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {value ? (
        // Show uploaded image
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        // Upload area
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
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
              <p className="text-xs text-gray-500 mb-4">
                Drag and drop an image here, or click to select
              </p>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2">
                <Upload size={16} />
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}
      
      {uploadError && (
        <p className="text-sm text-red-600 mt-2">{uploadError}</p>
      )}

      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF. Max size: 5MB
      </p>
    </div>
  );
}