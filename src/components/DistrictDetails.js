// import React from "react";
// import Review from "./Review";

// const DistrictDetails = ({ district, onBack }) => {
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       {/* Back Button */}
//       <button
//         className="mb-4 text-blue-500 hover:underline"
//         onClick={onBack}
//       >
//         &larr; Back to Districts
//       </button>

//       {/* District Header */}
//       <h2 className="text-3xl font-bold text-green-800 mb-6">{district.name}</h2>
//       {/*<p className="text-lg mb-4">{district.description}</p>*/}

//       {/* Famous Places Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Famous Places : </h3>
//         <ul className="space-y-4">
//           {district.famousPlaces.map((place, index) => (
//             <li
//               key={index}
//               className="p-4 bg-gray-100 rounded-lg shadow flex items-center gap-4"
//             >
//               <img
//                 src={place.image}
//                 alt={place.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />
//               <div>
//                 <h4 className="text-xl font-bold text-green-700">{place.name}</h4>
//                 {/*<p className="text-gray-600">{place.description}</p>*/}
//                 <p className="text-sm text-gray-500">
//                   Distance: {place.distance} <br></br>
//                    Time: {place.time}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Famous Food Section */}
//       {/* Famous Food and Items Section */}
// {/* Famous Food and Items Section */}
// <div className="mb-8">
//   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Famous Food and Items</h3>
//   <div className="flex items-center gap-3 text-lg text-gray-600">
//     <img
//       src="https://cdn-icons-png.flaticon.com/512/2643/2643437.png" // General food icon
//       alt="Food Icon"
//       className="w-6 h-6 object-contain"
//     />
//     <span className="font-medium">
//       {district.famousFood.join(", ")}.
//     </span>
//   </div>
// </div>


//       {/* Restaurants Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nearby Restaurants</h3>
//         <ul className="space-y-2">
//           {district.nearbyRestaurants.map((restaurant, index) => (
//             <li key={index} className="text-lg text-gray-600">
//               <span className="font-bold text-green-700">{restaurant.name}:</span>{" "}
//               {restaurant.address}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Hotels Section */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hotels for Stay</h3>
//         <ul className="space-y-2">
//           {district.nearbyHotels.map((hotel, index) => (
//             <li key={index} className="text-lg">
//               <a
//                 href={hotel.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {hotel.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Suggested Visiting Order */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Suggested Visiting Order</h3>
//         <p className="text-lg text-gray-600">
//           {district.famousPlaces.map((place) => place.name).join(" → ")}.
//         </p>
//       </div>

//       {/* Place Highlights with Images */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Place Highlights</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {district.famousPlaces.map((place, index) => (
//             <div
//               key={index}
//               className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center"
//             >
//               <img
//                 src={place.image}
//                 alt={place.name}
//                 className="w-49 h-49 object-cover rounded-md mb-4"
//               />
//               <h4 className="text-lg font-bold text-green-700">{place.name}</h4>
//               <p className="text-sm text-gray-600 text-center">{place.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* Reviews Section */}
//       <Review placeName={district.name} />
//     </div>
//   );
// };

// export default DistrictDetails;

import React, { useState, useEffect } from "react";
import Review from "./Review";

const DistrictDetails = ({ district, onBack }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([]); // Added state for storing favorite places
  const [user, setUser] = useState(null); // Added state to check if user is logged in

  // Fetch user and favorite places when the component loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
    if (storedUser) {
      fetchFavoritePlaces(storedUser.token); // Fetch favorite places for logged-in user
    }
  }, []);

  // Function to fetch user's favorite places from backend
  const fetchFavoritePlaces = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFavoritePlaces(data.favorites || []); // Store fetched favorites in state
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Function to add a place to favorites
  const handleAddFavorite = async (place) => {
    if (!user) {
      alert("Please log in to add favorites."); // Alert if user is not logged in
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ placeName: place.name, image: place.image }),
      });

      const data = await response.json();
      if (response.ok) {
        setFavoritePlaces([...favoritePlaces, place]); // Update favorite places in state
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Function to remove a place from favorites
  const handleRemoveFavorite = async (placeName) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ placeName }),
      });

      if (response.ok) {
        setFavoritePlaces(favoritePlaces.filter((p) => p.name !== placeName)); // Remove place from state
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button className="mb-4 text-blue-500 hover:underline" onClick={onBack}>
        &larr; Back to Districts
      </button>

      {/* District Header */}
      <h2 className="text-3xl font-bold text-green-800 mb-6">{district.name}</h2>

      {/* Favorite Places Section (NEW) */}
      {user && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Favorite Places</h3>
          {favoritePlaces.length === 0 ? (
            <p className="text-lg text-gray-600">No favorite places added yet.</p>
          ) : (
            <ul className="space-y-4">
              {favoritePlaces.map((place, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow flex items-center gap-4"
                >
                  <img src={place.image} alt={place.name} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h4 className="text-xl font-bold text-green-700">{place.name}</h4>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRemoveFavorite(place.name)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Famous Places Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Famous Places : </h3>
        <ul className="space-y-4">
          {district.famousPlaces.map((place, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow flex items-center gap-4">
              <img src={place.image} alt={place.name} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h4 className="text-xl font-bold text-green-700">{place.name}</h4>
                <p className="text-sm text-gray-500">
                  Distance: {place.distance} <br />
                  Time: {place.time}
                </p>
                {user && (
                  <button
                    className="mt-2 text-blue-500 hover:underline"
                    onClick={() => handleAddFavorite(place)}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Famous Food Section */}
      <div className="mb-8">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" className="w-6 h-6" />
    Famous Food and Items
  </h3>
  <div className="flex flex-wrap gap-3">
    {district.famousFood.map((item, idx) => (
      <span
        key={idx}
        className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
      >
        
        {item}
      </span>
    ))}
  </div>
</div>


      {/* Nearby Restaurants */}
      {/* Nearby Restaurants */}
<div className="mb-8">
  <div className="flex items-center gap-3 mb-4">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3075/3075974.png" // Restaurant icon
      alt="Restaurant Icon"
      className="w-7 h-7"
    />
    <h3 className="text-2xl font-semibold text-gray-800">Nearby Restaurants</h3>
  </div>
  <ul className="space-y-3">
    {district.nearbyRestaurants.map((restaurant, index) => (
      <li
        key={index}
        className="p-3 bg-gray-50 rounded-lg shadow flex items-start gap-2"
      >
        <span className="text-green-700 font-bold">{restaurant.name}:</span>
        <span className="text-gray-600">{restaurant.address}</span>
      </li>
    ))}
  </ul>
</div>


      {/* Hotels */}
      <div className="mb-8">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <img src="/image/5-stars.png" className="w-6 h-6" />
    Hotels for Stay
  </h3>
  <ul className="space-y-3">
    {district.nearbyHotels.map((hotel, index) => (
      <li key={index} className="flex items-center gap-2 text-lg">
        
        <a
          href={hotel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {hotel.name}
        </a>
      </li>
    ))}
  </ul>
</div>

             {/* Place Highlights with Images */}
      <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
    <img
      src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
      alt="Place Highlight Icon"
      className="w-7 h-7"
    />
    <h3 className="text-2xl font-semibold text-gray-800">Place Highlights</h3>
  </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {district.famousPlaces.map((place, index) => (
            <div
             key={index}
            className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center"
            >
               <img
                 src={place.image}
                 alt={place.name}
                 className="w-49 h-49 object-cover rounded-md mb-4"
               />
               <h4 className="text-lg font-bold text-green-700">{place.name}</h4>
               <p className="text-sm text-gray-600 text-center">{place.description}</p>
             </div>
           ))}
         </div>
       </div>


      {/* Visiting Order */}
      <div className="mb-8">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" className="w-6 h-6" />
    Suggested Visiting Order
  </h3>
  <div className="flex flex-wrap gap-2 items-center text-lg text-gray-600">
    {district.famousPlaces.map((place, index) => (
      <React.Fragment key={index}>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full shadow text-sm">
          {place.name}
        </span>
        {index < district.famousPlaces.length - 1 && (
          <span className="text-gray-500 text-xl">➡️</span>
        )}
      </React.Fragment>
    ))}
  </div>
</div>


      {/* Reviews Section */}
      <Review placeName={district.name} />
    </div>
  );
};

export default DistrictDetails;
