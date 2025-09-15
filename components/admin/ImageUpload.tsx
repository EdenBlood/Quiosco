"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <>
      <CldUploadWidget
        uploadPreset="fprkkayy"
        options={{
          maxFiles: 1,
        }}
        onSuccess={(result, { widget }) => {
          if (result.event === "success") {
            widget.close();
            // @ts-ignore
            setImageUrl(result.info.secure_url);
          }
        }}
      >
        {({ open }) => (
          <>
            <div className="space-y-2">
              <label className="text-slate-800">
                Imagen:
                <div
                  onClick={() => open()}
                  className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-neutral-300 bg-slate-100 p-10 text-neutral-600 transition duration-300 hover:opacity-70"
                >
                  <TbPhotoPlus size={50} />
                  <p className="text-lg font-semibold">Agregar Imagen</p>

                  {imageUrl && (
                    <div className="absolute inset-0 h-full w-full">
                      <Image
                        fill
                        className="object-contain"
                        src={imageUrl}
                        alt="Imagen del producto"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>

            <input type="hidden" name="image" value={imageUrl} />
          </>
        )}
      </CldUploadWidget>
    </>
  );
}
