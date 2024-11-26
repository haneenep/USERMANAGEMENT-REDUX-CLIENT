import axios from "axios";

export const ImageUpload = async (file: File) => {

  console.log(file,"file is here");;
  
  const presetKey = "user-management";
  const cloudName = "dyd8cwf8e";

  if (!presetKey || !cloudName) {
    console.log('cloudinary presest key or name is miising provlem');
    
    console.error("Cloudinary preset key or cloud name is missing");
    return null;
  }

  
  try {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", presetKey);

  console.log(formData,"fordata coame");
  

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
      formData
    );

    const { secure_url } = res.data;

    console.log(secure_url, "secure url");
    console.log(res.data, "resp data");

    return secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};