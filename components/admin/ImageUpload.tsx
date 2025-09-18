"use client";

import { getImagePath } from "@/src/utils";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <>
      <CldUploadWidget
        uploadPreset="fprkkayy"
        options={{
          maxFiles: 1,
        }}
        onSuccess={(result: CloudinaryUploadWidgetResults, { widget }) => {
          if (result.event === "success") {
            widget.close();
            if (
              typeof result.info === "object" &&
              result.info !== null &&
              "secure_url" in result.info
            ) {
              setImageUrl((result.info as { secure_url: string }).secure_url);
            }
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

            {image && !imageUrl && (
              <div className="space-y-2">
                <label>Imagen actual:</label>
                <div className="relative size-64">
                  <Image
                    src={getImagePath(image)}
                    alt="Imagen de el Producto anterior"
                    fill
                  />
                </div>
              </div>
            )}
            <input
              type="hidden"
              name="image"
              defaultValue={imageUrl ? imageUrl : image}
              className="object-cover object-center"
            />
          </>
        )}
      </CldUploadWidget>
    </>
  );
}
