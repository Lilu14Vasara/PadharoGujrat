import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import somnathImage from './somnath.jpg';
import { Navigation, Autoplay } from "swiper/modules";

const HomePage = () => {
  const famousPlaces = [
    {
      name: "Somnath Temple",
      image:somnathImage,
      link: "",
    },
    {
      name: "Gir National Park",
      image:
        "/image/girNationalpark.jpg",
      link: "https://www.girnationalpark.in/",
    },
    {
      name: "Rann of Kutch",
      image:
        "/image/kutch.png",
      link: "https://www.rannutsav.net/",
    },
    {
      name: "Adalaj ni vav",
      image:
        "/image/Adalaj-ni-Vav.jpg",
      link: "https://en.wikipedia.org/wiki/Adalaj_Stepwell",
    },
    {
      name: "Dwarkadhish Temple",
      image:
        "/image/dwarka.jpg",
      link: "https://dwarkadhish.org/",
    },
    {
      name: "Saputara Hill Station",
      image:
        "/image/saputara.jpg",
      link: "https://www.gujarattourism.com/",
    },
  
    {
      name: "Lakhota Lake & Palace",
      image: "/image/lakhotaTdav.jpeg",
      link: "https://www.nativeplanet.com/jamnagar/attractions/lakhota-palace/",
    },

    {
      name: "Bhujodi Village",
      image: "/image/bhojadivillages.jpeg",
      link: "https://www.gujarattourism.com/kutch/bhuj/bhujodi.html",
    },
    
    {
      name: "Aina Mahal",
      image: "/image/AniaMahel.jpeg",
      link: "https://www.gujarattourism.com/kutch/bhuj/aina-mahal.html",
    },

    {
      name: "Akshardham Temple",
      image: "/image/gandhinarAkasardham.jpeg",
      link: "https://akshardham.com/gujarat/",
    },
    {
      name: "Indroda Nature Park",
      image: "/image/indoorePark.jpeg",
      link: "https://www.gujarattourism.com/gandhinagar/indroda-nature-park.html",
    },
  ];

  return (
    <div>
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center my-12">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Welcome to Gujarat Travel Guide
        </h2>
        <p className="text-lg text-gray-700">
          Explore the cultural, historical, and natural beauty of Gujarat. From
          the white desert of Kutch to the sacred temples of Dwarka, we bring
          you a comprehensive guide to all the must-visit destinations in
          Gujarat.
        </p>
      </section>
      


      {/* Famous Places Section */}
      <section className="my-12">
  <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
    Famous Places in Gujarat
  </h3>
  <Swiper
    modules={[Navigation, Autoplay]}
    navigation
    autoplay={{ delay: 3000 }}
    loop
    spaceBetween={20}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
  >
    {famousPlaces.map((place, index) => (
      <SwiperSlide key={index}>
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-64"> {/* Ensures a consistent height for all images */}
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover object-center" 
            />
          </div>
          <div className="p-4">
            <h4 className="text-lg font-bold text-green-700">
              {place.name}
            </h4>
            <a
              href={place.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Learn More
            </a>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
<section className=" py-8 px-4 rounded-lg shadow-md max-w-4xl mx-auto my-12">
        <h3
          className="text-2xl font-semibold text-green-700 text-center mb-4"
          style={{ textShadow: "1px 1px 2px #154360" }}
        >
          પધારો ગુજરાત
        </h3>
        <p
          className="text-lg text-gray-800 font-medium text-center leading-relaxed"
          style={{ fontFamily: "'Mukti Narrow', sans-serif" }}
        >
          "વિહંગમ રંગોથી ભરપૂર ગુજરાત,<br />
          તિથલથી રણકચ્છ સુધીનો પ્રેમ અપરંપાર..."<br />
          અહીં તહેવારોમાં છે જીવનનો આનંદ,<br />
          આવો, આપનું સ્વાગત છે પધારો ગુજરાત...❤️"
        </p>
      </section>

    </div>
  );
};

export default HomePage;
