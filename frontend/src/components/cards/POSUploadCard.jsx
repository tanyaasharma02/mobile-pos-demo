import React, { useState } from "react";

const POSUploadCard = ({ onUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Send file info back to chat flow
      onUpload?.(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 w-full max-w-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">
        Upload your POS photo
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        This helps us identify your current system and tailor the best Genius
        solution.
      </p>

      <label className="block">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow hover:opacity-90 transition">
          Upload Photo
        </div>
      </label>

      {/* 🖼️ Show uploaded image preview */}
      {imagePreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Uploaded Image Preview:</p>
          <img
            src={imagePreview}
            alt="POS Upload Preview"
            className="rounded-xl border border-gray-200 max-h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default POSUploadCard;
