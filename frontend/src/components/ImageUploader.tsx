import React, { useRef } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File(
          [compressedBlob],
          file.name,
          { type: file.type }
        );

        onImageSelect(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to compress image");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={handleButtonClick}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Choose Image
      </button>
    </div>
  );
};

export default ImageUploader; 