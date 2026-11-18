import { useEffect, useState } from "react";
import axios from "axios";

function Banners() {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const adminToken = localStorage.getItem("adminToken");

  const getBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banner");
      setBanners(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);

      if (image) {
        formData.append("image", image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/banner/${editingId}`,
          formData,
          config
        );
      } else {
        if (!image) {
          alert("Please select a banner image");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/banner/add",
          formData,
          config
        );
      }

      alert(editingId ? "Banner updated successfully" : "Banner added successfully");

      resetForm();
      getBanners();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setImage(null);
    setEditingId(null);
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setTitle(banner.title);
    setDescription(banner.description || "");
    setLink(banner.link || "");
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/banner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert("Banner deleted successfully");
      getBanners();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const toggleStatus = async (banner) => {
    try {
      const formData = new FormData();
      formData.append("isActive", !banner.isActive);

      await axios.put(
        `http://localhost:5000/api/banner/${banner._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      getBanners();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Banner Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-5 mb-8 space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Banner" : "Add New Banner"}
        </h2>

        <input
          type="text"
          placeholder="Banner Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Link (Example: /product)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded"
          required={!editingId}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Banner" : "Add Banner"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Banners</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {banners.map((banner) => (
          <div key={banner._id} className="border rounded-lg p-4 shadow">
            <img
              src={`http://localhost:5000/uploads/${banner.image}`}
              alt={banner.title}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <h3 className="font-bold text-lg">{banner.title}</h3>
            <p className="text-gray-600">{banner.description}</p>
            <p className="text-sm text-gray-500 mt-1">{banner.link}</p>

            <p className="mt-2">
              Status: {banner.isActive ? "Active" : "Inactive"}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => handleEdit(banner)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => toggleStatus(banner)}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                {banner.isActive ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => handleDelete(banner._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banners;