import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle File Selection
  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]); // Select the first uploaded file
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only images
  });

  // Upload Image to Backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("photo", selectedFile); // Ensure this matches "photo" in the backend
  
    try {
      const response = await axios.post("http://localhost:8080/api/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Upload Successful:", response.data);
      setUploadedImages([response.data, ...uploadedImages]);
    } catch (error) {
      console.error("Upload Error:", error.response ? error.response.data : error.message);
    }
  };

  // Fetch Uploaded Images from Backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/get")
      .then((res) => setUploadedImages(res.data))
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Upload an Image</h2>

      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 rounded-md cursor-pointer text-center"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image, or click to select one</p>
      </div>

      {/* Show Selected File */}
      {selectedFile && <p className="mt-2 text-gray-600">{selectedFile.name}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>

      {/* Display Uploaded Images */}
      <h3 className="mt-6 text-lg font-semibold">Uploaded Images</h3>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {uploadedImages.map((img, index) => (
          <img
            key={index}
            src={img.photo}
            alt={`Uploaded ${index}`}
            className="w-full h-32 object-cover rounded-md shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;