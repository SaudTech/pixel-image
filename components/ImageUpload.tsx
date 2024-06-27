import React from "react";

const ImageUpload = ({
  onImageUpload,
}: {
  onImageUpload: (img: HTMLImageElement | null) => void;
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      onImageUpload(img);
    };
  };

  return (
    <div className="p-2 bg-card/80 border-card rounded-sm">
      Select an image:{" "}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUpload;
