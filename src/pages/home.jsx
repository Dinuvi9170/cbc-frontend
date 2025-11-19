import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Home= ()=> {
  return (
    <div className="bg-primary">
      <section className="relative h-[70vh] w-full">
        <img
          src="/images/hero-cosmetics.jpg"
          className="object-cover w-full h-full"
          alt="Cosmetics Hero"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center px-6 md:px-20">
          <div>
            <h1 className="text-white font-bold text-4xl md:text-6xl drop-shadow-lg">
              Beauty Starts With You
            </h1>
            <p className="text-white text-lg mt-3 max-w-md">
              Discover premium skincare, fragrances, and makeup curated just for you.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center mt-5 px-6 py-3 bg-white text-[#821742] font-semibold rounded-full shadow hover:bg-[#f8e7ec]"
            >
              Shop Now <BsArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-acsent">Shop By Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6">
          {[
            { name: "Makeup", img: "/images/categories/makeup.jpg",url: "/categories/Makeup" },
            { name: "Skincare", img: "/images/categories/skincare.jpg", url: "/categories/Skincare" },
            { name: "Haircare", img: "/images/categories/haircare.jpg", url: "/categories/Haircare" },
            { name: "Fragrances", img: "/images/categories/fagrances.jpg" ,url: "/categories/Fragrance"},
            { name: "Bath & Body", img: "/images/categories/bathe&body.jpg", url: "/categories/Bodycare" },
            { name: "Other", img: "/images/categories/other.avif",url: "/categories/Other" },
          ].map((c) => (
            <Link to={c.url}
              key={c.name}
              className="rounded-xl overflow-hidden shadow-lg bg-white group cursor-pointer"
            >
              <img src={c.img} className="h-40 w-full object-cover group-hover:scale-105 duration-300" />
              <p className="text-center py-3 font-semibold text-gray-700">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="px-6 md:px-20 py-12 bg-white rounded-t-3xl shadow-inner">
        <h2 className="text-2xl md:text-3xl font-bold text-acsent">Trending Now</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-[#FFF4F7] rounded-xl p-4 shadow hover:shadow-xl duration-300">
              <img src={`/images/prod${i}.jpg`} className="h-40 w-full object-cover rounded-lg" />
              <h3 className="font-semibold mt-3">Luxury Lipstick {i}</h3>
              <p className="text-gray-500">Soft Matte Finish</p>
              <p className="text-acsent font-bold mt-2">$24</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY SKIN TYPE */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-acsent">Shop by Skin Type</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {["Dry", "Oily", "Normal", "Sensitive"].map((type) => (
            <div
              key={type}
              className="border border-[#fad0e6] rounded-2xl p-6 text-center font-semibold bg-white hover:bg-[#ffebf2] duration-300"
            >
              {type} Skin
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-20 py-12 bg-[#FFF4F7]">
        <h2 className="text-2xl md:text-3xl font-bold text-acsent">What Customers Say</h2>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p className="italic text-gray-600">
                "Absolutely love the quality! The best cosmetics experience ever."
              </p>
              <p className="mt-4 font-bold text-[#821742]">— Sarah K.</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 md:px-20 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-acsent">Stay Updated</h2>
        <p className="text-gray-600 mt-2">Get exclusive offers, tips and new arrivals.</p>

        <div className="mt-5 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 rounded-l-full border border-gray-300"
          />
          <button className="px-6 py-2 bg-[#821742] text-white rounded-r-full">
            Subscribe
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-acsent text-white py-8 text-center">
        <p>© 2025 BeautyLux Cosmetics. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
