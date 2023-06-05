import InputImageIconReference from "../GeneralComponents/Images/InputImageIconReference";
import styled from "styled-components";

const Thumbnail = styled.div`
  position: relative;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 130px;
  height: 180px;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  border: 2px solid var(--fontColor-highlight);
  width: 130px;
  height: 180px;
  max-width: none;
  max-height: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 130px;
  min-height: 180px;
`;

const ThumbnailRemoveButton = styled.button`
  padding: 0 0 2px 2px;
  background-color: var(--background);
  color: var(--fontColor-highlight);
  width: 39px;
  height: 39px;
  border-left: 2px solid var(--fontColor-highlight);
  border-bottom: 2px solid var(--fontColor-highlight);
  text-align: center;
  vertical-align: center;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0px;
`;

export default function ImageUploadPreviews({
  imageThumbnails,
  handleFileUpload,
  handleImageRemove,
}) {
  const renderImage = (index) => {
    if (index < imageThumbnails.length) {
      const thumbnailSrc = imageThumbnails[index];
      return (
        <Thumbnail key={index}>
          <ThumbnailContainer>
            <ThumbnailImage src={thumbnailSrc} alt="Thumbnail" />
          </ThumbnailContainer>
          <ThumbnailRemoveButton onClick={() => handleImageRemove(index)}>
            ✕
          </ThumbnailRemoveButton>
        </Thumbnail>
      );
    } else if (index === imageThumbnails.length) {
      return (
        <div key={index}>
          <InputImageIconReference handleFileUpload={handleFileUpload} />
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{Array.from({ length: 4 }).map((_, index) => renderImage(index))}</>;
}
