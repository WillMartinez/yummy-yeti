import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onUploadSuccess: (publicId: string) => void;
}

export default function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="recipe_images"
      options={{
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
        showAdvancedOptions: false,
        cropping: false,
        showSkipCropButton: false,
        singleUploadAutoClose: true,
      }}
      onSuccess={(result, { widget }) => {
        if (
          result.info &&
          typeof result.info === "object" &&
          "public_id" in result.info
        ) {
          onUploadSuccess(result.info.public_id);
          setIsUploaded(true);
          toast.success("Image uploaded successfully!");
          widget.close();
        }
      }}
    >
      {({ open }) => {
        const handleClick = (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        };

        return (
          <button
            type="button"
            onClick={handleClick}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {isUploaded ? (
              <>
                <p className="text-green-600">✓ Image uploaded successfully!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Click to upload a different image
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600">Click to upload an image</p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports: JPG, PNG, WebP, AVIF
                </p>
              </>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
