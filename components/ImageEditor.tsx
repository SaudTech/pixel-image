"use client";
import React, { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import SettingField from "./SettingField";

interface SettingInfo {
  intensity: number;
  entireImage: boolean;
}

const ImageEditor: React.FC = () => {
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
    <div className="flex justify-between w-full gap-3">
      <div>
        <ImageUpload onImageUpload={handleImageUpload} />
        <div className="p-2 bg-card/80 border-card rounded-sm">
          Setting:{" "}
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
          </div>
        </div>
        <Button onClick={handleDownload} className="p-2 w-full mt-3 rounded-sm">
          Download Image
        </Button>
      </div>

      <div className="bg-card rounded-md p-2 w-3/4 relative">
        <div className="w-full h-9">Image Preview</div>
        <div className="relative">
          <canvas ref={canvasRef} />
          {!setting.entireImage && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
