"use client";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const availableFormats = ["png", "jpg", "jpeg", "webp", "gif", "bmp"];

const ConvertImage = ({ params }: { params: { format: string } }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const format = params.format;
  const pathname = usePathname();

  const handleImageUpload = (img: HTMLImageElement | null) => {
    setImage(img);
  };

  const convertAndDownloadImage = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      alert("Error initializing canvas context.");
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    canvas.toBlob(
      async (blob) => {
        if (blob) {
          // Create download link and trigger download
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `converted-image.${format}`;
          link.click();
        } else {
          alert("Conversion failed. Unsupported format.");
        }
      },
      `image/${format}`,
      1
    );
  };

  return (
    <div>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Convert Image to {format.toUpperCase()}
        </h1>
        <ImageUpload onImageUpload={handleImageUpload} />
        <Button
          onClick={convertAndDownloadImage}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          disabled={!image}
        >
          Convert and Download
        </Button>
      </div>

      <div className=" mt-6">
        <div className="flex justify-center mb-6 gap-2">
          <span className="text-gray-500">Convert to other formats</span>
        </div>
        <div className="flex flex-wrap scale justify-center gap-4">
          {availableFormats.map(
            (fmt) =>
              fmt !== format && (
                <Link
                  key={fmt}
                  href={`${pathname.split("/").slice(0, -1).join("/")}/${fmt}`}
                >
                  <Button className="min-w-[180px]">
                    Convert to {fmt.toUpperCase()}
                  </Button>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvertImage;
