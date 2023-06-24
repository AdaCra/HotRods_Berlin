import cloudinary from "cloudinary/v2";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadImagesToCloudinary(images) {
  const uploadedImageURLs = [];

  for (const image of images) {
    const { path } = image;
    const { secure_url } = await cloudinary.uploader.upload(path, {
      folder: "damage-reports", 
    });
    uploadedImageURLs.push(secure_url);
  }

  return uploadedImageURLs;
}
