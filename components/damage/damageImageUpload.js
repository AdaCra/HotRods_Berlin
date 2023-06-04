import { useState } from "react";
import ImageUploadPreviews from "./ImageSwitchReturn";
import styled from "styled-components";

const ImageUploadSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ImageThumbnailSection = styled.section`
  margin-top: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  border: 1px solid var(--fontColor-highlight);
`;

export default function DamageImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageThumbnails, setImageThumbnails] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
console.log(files)
    if (selectedImages.length + files.length > 4) {
      // Limit the total number of images to 4
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setSelectedImages((prevSelectedImages) => [
            ...prevSelectedImages,
            file,
          ]);
          setImageThumbnails((prevThumbnails) => [
            ...prevThumbnails,
            e.target.result,
          ]);
        };

        console.log(reader);
        reader.readAsDataURL(file);
      }
    });
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedSelectedImages = [...prevSelectedImages];
      updatedSelectedImages.splice(index, 1);
      return updatedSelectedImages;
    });
    setImageThumbnails((prevThumbnails) => {
      const updatedThumbnails = [...prevThumbnails];
      updatedThumbnails.splice(index, 1);
      return updatedThumbnails;
    });
  };

  return (
    <ImageUploadSection>
      <label htmlFor="imageUpload">Schadensbilder hochladen:</label>
      <ImageThumbnailSection>
        <ImageUploadPreviews
          selectedImages={selectedImages}
          imageThumbnails={imageThumbnails}
          handleFileUpload={handleFileUpload}
          handleImageRemove={handleImageRemove}
        />
      </ImageThumbnailSection>
    </ImageUploadSection>
  );
}
