import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Anuradha Perera",
    text: "Absolutely love the quality! The best cosmetics experience ever.",
    rating: 5,
  },
  {
    name: "Kalindi Fernando",
    text: "Amazing products and super fast delivery. Highly recommended!",
    rating: 4,
  },
  {
    name: "Samanali Athapattu",
    text: "My skin has never looked better. Wonderful customer support too!",
    rating: 5,
  },
  {
    name: "Kasuni Nuravi",
    text: "Beautiful packaging, premium feel, and excellent customer care!",
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <section className="px-6 md:px-20 py-16 bg-[url('/images/beautipicture.jpg')] bg-cover bg-center bg-no-repeat">
      <h2 className="text-3xl md:text-4xl font-bold text-acsent text-center mb-10">
        What Our Customers Say
      </h2>

      <Slider {...settings} className="max-w-3xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="px-4">
            <div className="bg-white rounded-3xl p-8 min-h-[200px] relative hover:scale-105 transition-transform">
              <div className="absolute -top-5 -left-5 text-[#821742] text-6xl opacity-10">“</div>

              <p className="text-gray-700 italic text-lg mb-6">{t.text}</p>

              <div className="flex flex-col items-center gap-4">
                <p className="font-semibold text-[#821742]">{t.name}</p>
                <div className="flex text-yellow-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
