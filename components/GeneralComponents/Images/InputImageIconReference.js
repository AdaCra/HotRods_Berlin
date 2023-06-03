import Image from "next/image";
import { useRef } from "react";

export default function InputImageIconReference({ handleFileUpload }) {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Image
        src="/iconography/ImageUploader.svg"
        width={130}
        height={180}
        alt="Upload Icon"
        className="upload-icon"
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
        priority
      />
      <input
        ref={fileInputRef}
        type="file"
        id="imageUpload"
        name="imageUpload"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={handleFileUpload}
        style={{ display: "none" }}
        required
      />
    </>
  );
}
