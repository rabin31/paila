import React from 'react';

function Card() {
  const images = [
    {
      id: 1,
      image: "https://happymountainnepal.com/wp-content/uploads/2025/04/Blog_20250110-1245282677-1736491311.jpg",
      title: "Pashupatinathh Temple",
      address: "Kathmandu",
      location: "https://maps.app.goo.gl/wg7p6TnQNnbM6s1fA"
    },
    {
      id: 2,
      image: "https://hetanderenepal.nl/wp-content/uploads/2025/01/header-Annapurna-Base-Camp-trekking-Nepal.jpg",
      title: "Annapurna Base Camp",
      address: "Kaski",
      location: "https://maps.app.goo.gl/8HdG2kme879MrxNY7"
    },
    {
      id: 3,
      image: "https://lumbinidevtrust.gov.np/upload_file/images/slider/1721894939_276597348_lumbini.jpg",
      title: "Mayadevi Temple Limbini ",
      address: "Rupandehi",
      location: "https://maps.app.goo.gl/Xv9o5bLB5hxJTTEVA"
    },
    {
      id: 4,
      image: "https://media.app.himalayantrekkingpath.com/uploads/fullbanner/darbar-square.webp",
      title: "Basantapur Durbar Square",
      address: "Kathmandu",
      location: "https://maps.app.goo.gl/SbTMw9qw24DdcLHUA"
    },
  ];

  return (
    <div className="">
      <div className="px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {images.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden shadow-2xl hover:shadow-3xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 rounded-sm border border-gray-200 bg-white"
            >
              {/* Image */}
              <a href={item.location} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-80 md:h-96">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-sm"
                  />
                </div>
              </a>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-b-2xl">
                <h3 className="text-white text-2xl font-semibold leading-tight">
                  {item.title} <span className="block text-sm font-light text-gray-200">Location: {item.address}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
