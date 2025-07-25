import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;


  // Fetch user's favorite places
  useEffect(() => {
    axios
      .get(`${API_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Error fetching favorites", err));
  }, []);

  // Handle image upload
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Add a Favorite Place
  const addFavorite = async (event) => {
    event.preventDefault();

    if (!name || !image || !description) {
      alert("Please enter a place name, upload an image, and write a description.");
      return;
    }

    if (!token) {
      alert("You must be logged in to add a favorite.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await axios.post(`${API_URL}/api/favorites`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFavorites([...favorites, response.data]); // Add new favorite to list
      setName("");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error adding favorite:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add favorite");
    }
  };

 
  const removeFavorite = (id) => {
    axios
      .delete(`${API_URL}/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setFavorites(favorites.filter((fav) => fav._id !== id)))
      .catch((err) => console.error("Error removing favorite", err));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6">My Favorite Places</h2>

      <div className="mt-6 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Your Favorite Place</h3>
        <form onSubmit={addFavorite} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter place name"
            className="border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description..."
            className="border p-2 rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload & Save
          </button>
        </form>
      </div>

      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {favorites.map((place) => (
            <div key={place._id} className="p-4 bg-white rounded-lg shadow-lg">
              <img
                src={`${API_URL}${place.image}`}
                alt={place.name || "Favorite Place"}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold text-green-700">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
              <button
                onClick={() => removeFavorite(place._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
