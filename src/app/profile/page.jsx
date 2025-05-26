"use client";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { Camera, Trash, Check } from "lucide-react";
import PopupModal from "../../components/PopupModal";
import axios from "axios";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || "");
  const [popup, setPopup] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) {
        await handleSaveChanges(nameInput, data.imageUrl);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setPopup({ type: "error", message: "Image upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await handleSaveChanges(nameInput, "/images/default.jpg");
    } catch (err) {
      setPopup({ type: "error", message: "Failed to delete image." });
    }
  };

  const handleSaveChanges = async (updatedName = user.name, updatedImage = user.image) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedName, image: updatedImage }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        setUser(data.updatedUser);
        setEditingName(false);
        setPopup({ type: "success", message: "Profile updated successfully" });
      } else {
        setPopup({ type: "error", message: "Failed to update profile" });
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setPopup({ type: "error", message: "Logout failed. Please try again." });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <div className="relative w-28 h-28 mx-auto mb-4">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600" />
            </div>
          )}

          <img
            src={user.image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border"
          />

          <button
            className="absolute bottom-0 right-0 bg-white border rounded-full p-1 hover:bg-gray-100 z-20"
            onClick={() => fileInputRef.current.click()}
          >
            <Camera size={18} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {user.image !== "/images/default.jpg" && (
            <button
              onClick={handleDeleteImage}
              className="absolute -top-0 -right-0 bg-white border rounded-full p-1 hover:bg-red-100 z-20"
              title="Delete Image"
            >
              <Trash size={16} className="text-red-500" />
            </button>
          )}
        </div>

        <div className="mb-4 text-center">
          {!editingName ? (
            <p
              className="text-xl font-semibold text-center cursor-pointer"
              onClick={() => setEditingName(true)}
            >
              {user?.name}
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none bg-transparent"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <button
                onClick={() => handleSaveChanges(nameInput, user.image)}
                className="text-green-600 hover:text-green-800"
              >
                <Check size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>

      {popup && (
        <PopupModal
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
