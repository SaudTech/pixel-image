"use client";
import React, { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "../../../components/ui/button";
import ImageUpload from "../../../components/ImageUpload";
import SettingField from "../../../components/SettingField";

interface SettingInfo {
  intensity: number;
  entireImage: boolean;
}

const BlurFeature: React.FC = () => {
  const [setting, setSetting] = useState<SettingInfo>({
    intensity: 2,
    entireImage: false,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blurBoxRef = useRef<HTMLDivElement | null>(null);

  const [blurBox, setBlurBox] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });

  const handleImageUpload = (img: HTMLImageElement | null) => {
    setImage(img);
  };

  const applyBlurEffect = () => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (setting.entireImage) {
          ctx.filter = `blur(${setting.intensity}px)`;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.rect(blurBox.x, blurBox.y, blurBox.width, blurBox.height);
          ctx.clip();
          ctx.filter = `blur(${setting.intensity}px)`;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      }
    }
  };

  const handleDownload = () => {
    if (!image) return;
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "blurred-image.png";
          link.click();
        }
      });
    }
  };

  const handleBlurBoxMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    direction?: string
  ) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startBox = { ...blurBox };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (direction === "move") {
        const newX = startBox.x + (moveEvent.clientX - startX);
        const newY = startBox.y + (moveEvent.clientY - startY);
        setBlurBox((prev) => ({
          ...prev,
          x: Math.max(
            0,
            Math.min(newX, canvasRef.current!.width - blurBox.width)
          ),
          y: Math.max(
            0,
            Math.min(newY, canvasRef.current!.height - blurBox.height)
          ),
        }));
      } else if (direction === "resize") {
        const newWidth = Math.max(
          10,
          startBox.width + (moveEvent.clientX - startX)
        );
        const newHeight = Math.max(
          10,
          startBox.height + (moveEvent.clientY - startY)
        );
        setBlurBox((prev) => ({
          ...prev,
          width: Math.min(newWidth, canvasRef.current!.width - startBox.x),
          height: Math.min(newHeight, canvasRef.current!.height - startBox.y),
        }));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    applyBlurEffect();
  }, [image, setting.intensity, setting.entireImage, blurBox]);

  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-3 p-4">
      <div className="w-full md:w-1/4">
        <ImageUpload onImageUpload={handleImageUpload} />
        <hr className="my-4 border-gray-300" />
        <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm">
          <h3 className="mb-4 font-semibold text-lg">Settings</h3>
          <div>
            <SettingField
              label="Intensity"
              max={500}
              value={setting.intensity}
              entireImage={setting.entireImage}
              onChange={(value) =>
                setSetting((prev) => ({ ...prev, intensity: value }))
              }
              onToggle={(checked) =>
                setSetting((prev) => ({ ...prev, entireImage: checked }))
              }
            />
            <Button
              onClick={handleDownload}
              className="w-full mt-4 rounded-md bg-blue-500 text-white"
            >
              Download Image
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-3/4 bg-white border border-gray-300 rounded-md shadow-sm">
        <div className="w-full h-9 bg-gray-100 flex items-center justify-center border-b border-gray-300">
          Image Preview
        </div>
        {!setting.entireImage && image && (
          <div className="relative text-center">
            <canvas
              ref={canvasRef}
              className="border-black border border-solid"
            />
            <div
              ref={blurBoxRef}
              className="absolute border border-dashed border-black"
              style={{
                left: blurBox.x,
                top: blurBox.y,
                width: blurBox.width,
                height: blurBox.height,
              }}
              onMouseDown={(e) => handleBlurBoxMouseDown(e, "move")}
            >
              <div
                className="absolute w-3 h-3 bg-black"
                style={{ right: -6, bottom: -6, cursor: "nwse-resize" }}
                onMouseDown={(e) => handleBlurBoxMouseDown(e, "resize")}
              />
            </div>
          </div>
        )}
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Upload an image to start editing
          </div>
        )}
      </div>
    </div>
  );
};

export default BlurFeature;
