import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { useState } from "react";

interface ImageUploadProps {
  onUploadSuccess: (publicId: string) => void;
}

export default function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="recipe_images"
      onSuccess={(result) => {
        if (result.info && typeof result.info === 'object' && 'public_id' in result.info) {
          onUploadSuccess(result.info.public_id);
          setIsUploaded(true);
          toast.success('Image uploaded successfully!');
        }
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
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
        </div>
      )}
    </CldUploadWidget>
  );
}
