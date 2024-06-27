import React, { useRef, useState } from "react";

const ImageUpload = ({
  onImageUpload,
}: {
  onImageUpload: (img: HTMLImageElement | null) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      onImageUpload(img);
      setPreview(img.src);
    };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Uploaded"
            className="max-w-full max-h-64 rounded-md"
          />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          <p className="text-gray-700 mb-2">
            Drag & drop an image here, or{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              browse
            </span>{" "}
            to select
          </p>
          {isDragging ? (
            <p className="text-blue-500">Release to upload</p>
          ) : (
            <p className="text-gray-500">PNG, JPG, GIF up to 10MB</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;