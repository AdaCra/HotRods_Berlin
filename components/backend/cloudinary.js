import cloudinary from 'cloudinary/v2';
import { useState } from "react";

export function Imageupload() {
  const [isImageUpload, setIsImageUpload] = useState(false);

  async function uploadToCloudinary() {
    const widget = window.cloudinary.createUploadWidget({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    },
    (error,result)=>{
      if(!error && result && result.event === "success"){
        setIsImageUpload(true);

      } else if (error){
        console.log(error)
      }
    });
    widget.open()
  }
}

const uploads = (file, folder) => {
  return new Promise((resolve, reject) =>
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    )
  );
};

export { uploads, cloudinary };
