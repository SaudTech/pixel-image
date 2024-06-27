"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const availableFormats = ["png", "jpg", "jpeg", "webp", "gif", "bmp"];

const page = () => {
  const pathname = usePathname();

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-6 gap-2">
        <span className="text-gray-500">
          To which format do you want to convert to?
        </span>
      </div>
      <div className="flex flex-wrap scale justify-center gap-4">
        {availableFormats.map((fmt) => (
          <Link
            key={fmt}
            href={`/convert-image/${pathname.split("/").slice(0, -1).join("/")}/${fmt}`}
          >
            <Button className="min-w-[180px]">
              Convert to {fmt.toUpperCase()}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
