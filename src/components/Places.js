import React, { useState } from "react";
import DistrictDetails from "./DistrictDetails";

const districts = [
  {
    name: "Ahmedabad",
    description: "Known for the Sabarmati Ashram and exquisite textiles. The city is a melting pot of rich heritage and modern-day culture, making it one of the most visited cities in Gujarat.",
    image: "/image/ahmedabad-places.webp",
    famousPlaces: [
      {
        name: "Sabarmati Ashram",
        distance: "5 km",
        time: "1-2 hours",
        description: "Sabarmati Ashram, established by Mahatma Gandhi, is an iconic place of historical significance. It served as the center for the Indian independence movement and is a peaceful retreat for visitors seeking to understand India's struggle for freedom.",
        image: "/image/sabarmati.avif",
      },
      {
        name: "Kankaria Lake",
        distance: "10 km",
        time: "2-3 hours",
        description: "Kankaria Lake is a family-friendly recreational area with a zoo, toy train, and numerous attractions. It is an ideal spot to relax, go boating, and enjoy local snacks while admiring the scenic beauty.",
        image: "/image/kankariya.jpg",
      },
      {
        name: "Adalaj Stepwell",
        distance: "25 km",
        time: "1-1.5 hours",
        description: "Adalaj Stepwell is a five-story marvel of architecture, built in the 15th century. The intricate carvings and cool, serene atmosphere offer a unique glimpse into ancient Indian craftsmanship and water conservation techniques.",
        image: "/image/Adalaj-ni-Vav.jpg",
      },
    ],
    nearbyRestaurants: [
      { name: "Agashiye", address: "The House of MG, Ahmedabad" },
      { name: "The Green House", address: "Ellis Bridge, Ahmedabad" },
      { name: "Manek Chowk", address: "Old City, Ahmedabad" },
    ],
    nearbyHotels: [
      { name: "Taj Skyline", link: "https://example.com/taj-skyline" },
      { name: "The House of MG", link: "https://example.com/house-of-mg" },
      { name: "Pride Plaza Hotel", link: "https://example.com/pride-plaza" },
    ],
    famousFood: ["Dhokla", "Khandvi", "Fafda", "Gathiya"],
  },
  {
    name: "Junagadh",
    description: "Famous for Gir National Park and Girnar Hills, Junagadh is steeped in history and spirituality. The city's ancient temples and historic forts offer a unique blend of nature and heritage.",
    image: "/image/girnarhills.avif",
    famousPlaces: [
      {
        name: "Girnar Hills",
        distance: "10 km",
        time: "3-4 hours",
        description: "Girnar Hills is a sacred pilgrimage site with a famous 10,000-step trek. It is renowned for its temples, ancient structures, and panoramic views, making it a must-visit for adventure seekers and spiritual travelers.",
        image: "/image/girnarhills.avif",
      },
      {
        name: "Gir National Park",
        distance: "35 km",
        time: "5-6 hours",
        description: "Gir National Park is home to the endangered Asiatic lions and offers a chance to experience the wild like never before. The park also features diverse wildlife and a rich ecosystem perfect for nature lovers.",
        image: "/image/girNationalpark.jpg",
      },
      {
        name: "Uparkot Fort",
        distance: "3 km",
        time: "1 hour",
        description: "Uparkot Fort is a historic fort that dates back over 2,000 years. It boasts massive walls, ancient gates, and ruins of temples, offering a glimpse into Junagadh's glorious past.",
        image: "/image/uperkot.jpg",
      },
    ],
    nearbyRestaurants: [
      { name: "Gir Jungle Lodge", address: "Sasan Gir, Junagadh" },
      { name: "Siddhivinayak Restaurant", address: "Station Road, Junagadh" },
      { name: "Dastur Restaurant", address: "Majevdi Gate, Junagadh" },
    ],
    nearbyHotels: [
      { name: "Lords Resort", link: "https://example.com/lords-resort" },
      { name: "Heritage Khirasara Palace", link: "https://example.com/khirasara-palace" },
      { name: "The Fern Gir Forest Resort", link: "https://example.com/fern-gir" },
    ],
    famousFood: ["Junagadhi Bhakri", "Ganthiya", "Kesar Mangoes"],
  },
  {
    name: "Dwarka",
    description: "Sacred city known for Dwarkadhish Temple, Dwarka is one of the Char Dham pilgrimage sites in India. The city's spiritual significance and historical sites attract devotees and tourists alike.",
    image: "/image/dwarka.jpg",
    famousPlaces: [
      {
        name: "Dwarkadhish Temple",
        distance: "2 km",
        time: "2 hours",
        description: "Dwarkadhish Temple is one of the oldest and most revered temples dedicated to Lord Krishna. It stands on the banks of the Gomti River, with impressive architecture and a tranquil environment that attracts thousands of devotees.",
        image: "/image/dwarka.jpg",
      },
      {
        name: "Rukmini Devi Temple",
        distance: "5 km",
        time: "30 minutes",
        description: "Rukmini Devi Temple is dedicated to Rukmini, the consort of Lord Krishna. The temple's stunning architecture and serene surroundings make it a peaceful retreat for those seeking spiritual solace.",
        image: "/image/rukhmani.jpg",
      },
      {
        name: "Nageshwar Temple",
        distance: "5 km",
        time: "1 hour",
        description: "Nageshwar Temple is one of the 12 Jyotirlinga shrines dedicated to Lord Shiva. The temple is located in a beautiful setting, surrounded by natural beauty, making it a perfect blend of spirituality and serenity.",
        image: "/image/nageshwar.jpg",
      },
    ],
    nearbyRestaurants: [
      { name: "Dolphin Restaurant", address: "Station Road, Dwarka" },
      { name: "Rukmini's Food Court", address: "Temple Road, Dwarka" },
      { name: "Navrang Restaurant", address: "Gomti Ghat, Dwarka" },
    ],
    nearbyHotels: [
      { name: "Dwarka Residency", link: "https://example.com/dwarka-residency" },
      { name: "Hotel Dwarka", link: "https://example.com/hotel-dwarka" },
      { name: "The Fern Residency", link: "https://example.com/fern-residency" },
    ],
    famousFood: ["Lassi", "Gulab Jamun", "Gujarati Thali"],
  },
  {
    name: "Somnath",
    description: "Famous for the ancient Somnath Temple, Somnath is a city steeped in legend and lore. It is one of the most significant pilgrimage destinations in India, attracting thousands of visitors every year.",
    image: "/image/somnath.jpeg",
    famousPlaces: [
      {
        name: "Somnath Temple",
        distance: "0 km",
        time: "1-2 hours",
        description: "Somnath Temple is one of the twelve Jyotirlingas, making it one of the holiest temples in India. The temple has a rich history, having been destroyed and rebuilt several times, and offers a powerful spiritual experience.",
        image: "/image/somnath.jpeg",
      },
      {
        name: "Triveni Sangam",
        distance: "3 km",
        time: "1 hour",
        description: "Triveni Sangam is the confluence of three sacred rivers: Hiran, Kapila, and Saraswati. This holy site is a place of religious significance where pilgrims come to take a dip to purify their souls.",
        image: "/image/Triveni-Sangam.jpg",
      },
      {
        name: "Prabhas Patan Museum",
        distance: "5 km",
        time: "1 hour",
        description: "Prabhas Patan Museum showcases artifacts related to the history and culture of Somnath and the surrounding region. The museum's collection includes sculptures, pottery, and other relics of historical significance.",
        image: "/image/Prabhas-Patan-Museum-1.jpg",
      },
    ],
    nearbyRestaurants: [
      { name: "The Somnath Restaurant", address: "Opposite Somnath Temple, Veraval" },
      { name: "Shree Restaurant", address: "Near Triveni Sangam, Somnath" },
      { name: "Hotel Somnath Sagar", address: "Close to Railway Station, Veraval" },
    ],
    nearbyHotels: [
      {
        name: "Lords Inn Somnath",
        link: "https://www.lordshotels.com/lords-inn-somnath",
      },
      {
        name: "The Fern Residency Somnath",
        link: "https://www.fernhotels.com/the-fern-residency-somnath.html",
      },
      {
        name: "Hotel Sagar Darshan",
        link: "https://sagardarshanhotel.com/",
      },
    ],
    famousFood: ["Shrikhand", "Thepla", "Undhiyu"],
  },
  {
    name: "Kutch",
    description: "Known for the White Desert and Rann Utsav, Kutch is a region that showcases the beauty of traditional art, crafts, and culture. The vast salt deserts and festive atmosphere make it a unique destination.",
    image: "/image/kutch.png",
    famousPlaces: [
      {
        name: "White Desert",
        distance: "10 km",
        time: "2 hours",
        description: "The White Desert, also known as the Rann of Kutch, is a vast stretch of salt desert that is stunningly beautiful. The Rann Utsav festival held here is a grand celebration of art, culture, and music.",
        image: "/image/white.jpg",
      },
      {
        name: "Mandvi Beach",
        distance: "35 km",
        time: "3 hours",
        description: "Mandvi Beach is a serene and peaceful destination, perfect for a relaxed beach experience. The beach is known for its clean shores, tranquil waters, and nearby attractions.",
        image: "/image/Mandvi-beach-thumbnail.jpg",
      },
      {
        name: "Bhuj Museum",
        distance: "20 km",
        time: "1-1.5 hours",
        description: "Bhuj Museum houses an impressive collection of Kutch's rich history, including artifacts, sculptures, and traditional crafts. It’s a must-visit for history enthusiasts and culture lovers.",
        image: "/image/bhuj museam.jpg",
      },
    ],
    nearbyRestaurants: [
      { name: "White Desert Cafe", address: "Main Road, Kutch, Gujarat" },
      { name: "Mandvi Beach Resort", address: "Mandvi Road, Gujarat" },
      { name: "Rann Utsav Dining", address: "Dhordo Village, Kutch" },
    ],
    nearbyHotels: [
      { name: "Hotel Kutch Mandvi Beach", link: "https://example.com/kutch-mandvi" },
      { name: "Rann Residency", link: "https://example.com/rann-residency" },
      { name: "Vijay Vilas Palace Hotel", link: "https://example.com/vijay-vilas" },
    ],
    famousFood: ["Dabeli", "Kutchi Bhakri", "Bajra no Rotlo"],
  },
  {
    name: "Jamnagar",
    description: "A city of temples and brass industries, Jamnagar is known for its marine sanctuary and rich cultural heritage.",
    image: "/image/jamnagar.jpg",
    famousPlaces: [
      {
        name: "Lakhota Lake & Palace",
        distance: "2 km",
        time: "1 hour",
        description: "Located in the middle of Lakhota Lake, this beautiful fort and museum offer a glimpse into Jamnagar’s royal history and scenic beauty.",
        image: "/image/lakhotaTdav.jpeg",
      },
      {
        name: "Marine National Park",
        distance: "35 km",
        time: "4-5 hours",
        description: "India’s first marine sanctuary offering coral reefs, diverse marine life, and crystal-clear waters. Ideal for nature lovers and adventure seekers.",
        image: "/image/Marine.jpeg",
      },
      {
        name: "Bala Hanuman Temple",
        distance: "1.5 km",
        time: "30 minutes",
        description: "Famous for its continuous chanting of 'Ram Dhun' since 1964, this temple holds a Guinness World Record and offers spiritual peace.",
        image: "/image/Balahnuman.jpeg",
      },
    ],
    nearbyRestaurants: [
      { name: "Rajdhani Restaurant", address: "Indira Marg, Jamnagar" },
      { name: "7 Seas Restaurant", address: "Hotel Aram, Jamnagar" },
      { name: "Chowpatty Food Court", address: "Marine Drive, Jamnagar" },
    ],
    nearbyHotels: [
      { name: "Hotel Fortune Palace", link: "https://example.com/fortune-palace" },
      { name: "Hotel Aram", link: "https://example.com/hotel-aram" },
      { name: "Hotel Express Residency", link: "https://example.com/express-residency" },
    ],
    famousFood: ["Ghooghra", "Farsan", "Bhajiya", "Khajali"],
  },
  {
    name: "Bhuj",
    description: "A gateway to the Rann of Kutch, Bhuj is rich in traditional handicrafts, heritage, and desert experiences.",
    image: "/image/bhuj.jpeg",
    famousPlaces: [
      {
        name: "Bhujodi Village",
        image: "image/bhojadivillages.jpeg",
        description:
          "A village known for its handloom weaving and crafts. Meet artisans, shop for handmade textiles, and see live weaving demonstrations.",
        distance: "8 km",
        time: "15-20 minutes by road from Bhuj city center",
      },
      {
        name: "Hamirsar Lake",
        image: "image/hamirsir.jpg",
        description:
          "A scenic lake in the center of Bhuj, perfect for a peaceful walk or picnic. Locals believe its water brings good luck.",
        distance: "0 km",
        time: "Located in the heart of Bhuj",
      },
      
      {
        name: "Aina Mahal",
        distance: "1 km",
        time: "1 hour",
        description: "A palace of mirrors, this 18th-century monument showcases Indo-European architecture and is filled with beautiful carvings and glass work.",
        image: "/image/AniaMahel.jpeg",
      },
  
    ],
    nearbyRestaurants: [
      { name: "Hotel Prince", address: "Station Road, Bhuj" },
      { name: "Neelam Restaurant", address: "Sanskar Nagar, Bhuj" },
      { name: "Jesal Restaurant", address: "Hospital Road, Bhuj" },
    ],
    nearbyHotels: [
      { name: "Hotel Prince Residency", link: "https://example.com/prince-bhuj" },
      { name: "Regenta Resort Bhuj", link: "https://example.com/regenta-bhuj" },
      { name: "White Rann Resort", link: "https://example.com/white-rann-resort" },
    ],
    famousFood: ["Dabeli", "Kutchi Kadak", "Bajra Rotla", "Kharek"],
  },
  {
    name: "Gandhinagar",
    description: "Gandhinagar, the capital of Gujarat, is a planned city known for its clean, green environment, Akshardham Temple, and educational institutions.",
    image: "/image/gandhinagar.jpeg",
    famousPlaces: [
      {
        name: "Akshardham Temple",
        distance: "2 km",
        time: "2-3 hours",
        description: "A majestic temple dedicated to Swaminarayan, known for its architecture, spiritual exhibits, and evening water show.",
        image: "/image/gandhinarAkasardham.jpeg",
      },
      {
        name: "Indroda Nature Park",
        distance: "5 km",
        time: "2 hours",
        description: "Also called the 'Jurassic Park of India', it features a zoo, botanical garden, fossil park, and nature trails.",
        image: "/image/indoorePark.jpeg",
      },
      {
        name: "Sarita Udyan",
        distance: "4 km",
        time: "1-2 hours",
        description: "A scenic riverfront garden on the banks of the Sabarmati River, ideal for picnics and evening walks.",
        image: "/image/saritaudhayan.jpeg",
      }
    ],
    nearbyRestaurants: [
      { name: "Toran Dining Hall", address: "Sector 16, Gandhinagar" },
      { name: "The Grand Thakar", address: "Sector 11, near GH-5 Circle" },
      { name: "Patang Restaurant", address: "Sector 21, Gandhinagar" }
    ],
    nearbyHotels: [
      { name: "Cambay Sapphire", link: "https://example.com/cambay-sapphire" },
      { name: "Infocity Club & Resort", link: "https://example.com/infocity-club" },
      { name: "Fortune Inn Haveli", link: "https://example.com/fortune-haveli" }
    ],
    famousFood: ["Gujarati Thali", "Fafda Jalebi", "Khaman", "Bhajiya"]
  },
  
  
];

const Places = () => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search City..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Districts Section */}
      {!selectedDistrict ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDistricts.map((district, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-green-100"
              onClick={() => setSelectedDistrict(district)}
            >
              <img
                src={district.image}
                alt={district.name}
                className="w-full h-52 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-bold mt-4">{district.name}</h2>
              <p className="text-gray-600">{district.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <DistrictDetails
          district={selectedDistrict}
          onBack={() => setSelectedDistrict(null)}
        />
      )}
    </div>
  );
};

export default Places;
