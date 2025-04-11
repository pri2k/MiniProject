import { useEffect } from "react";

export default function ImageUpload({ data, setData }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });
  
      const responseData = await res.json();
      console.log("✅ Cloudinary Response:", responseData);
  
      if (responseData.imageUrl) {
        console.log("🔄 Updating state with:", responseData.imageUrl);
  
        setData((prevData) => {
          console.log("🛑 Previous State:", prevData);
          return { ...prevData, image: responseData.imageUrl };
        });
      }
    } catch (error) {
      console.error("❌ Upload failed", error);
    }
  };
  
  
  useEffect(() => {
    console.log("🔥 Updated `data`: ", data);
  }, [data]);
   
    
    return (
      <div>
        <label htmlFor="imageUpload" className="block font-semibold mb-1">
          Upload Profile Image
        </label>
        <div 
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          {data.image ? (
            <img src={data.image} alt="Profile" className="h-24 w-24 object-cover rounded-full" />
          ) : (
            <p className="text-gray-600">Click to upload an image</p>
          )}
        </div>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    );
}
