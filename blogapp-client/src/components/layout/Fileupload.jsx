import { useRef } from "react";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:8080/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const imageUrl = res.data.url;
      onUploadSuccess(imageUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="absolute invisible"
        onChange={handleFileChange}
      />
      <i
        className="fi fi-rr-add text-4xl text-gray-300 cursor-pointer"
        onClick={handleClick}
      ></i>
    </div>
  );
};

export default FileUpload;
