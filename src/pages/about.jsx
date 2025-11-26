
const About = () => {
    return (
        <div className="pt-[120px] pb-5 px-6 md:px-16 lg:px-32 max-w-7xl mx-auto">
        <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-acsent mb-4">
            About Beauty Cosmetics
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            At Beauty Cosmetics, we are passionate about helping you feel confident, radiant, and beautiful. We bring you the finest skincare, makeup, and haircare products, crafted with care and innovation.
            </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
            <img
                src="/images/beauty.jpg"
                alt="Beauty Products"
                className="rounded-xl shadow-lg w-full object-cover"
            />
            </div>
            <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-acsent">Our Mission</h2>
            <p className="text-gray-700">
                To provide high-quality, cruelty-free products that enhance natural beauty and empower every individual to feel confident in their skin.
            </p>
            <h2 className="text-3xl font-semibold text-acsent">Our Vision</h2>
            <p className="text-gray-700">
                To be a leading brand in cosmetics, recognized for innovation, sustainability, and customer satisfaction.
            </p>
            </div>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-acsent mb-10">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-xl text-center hover:scale-105 transform transition duration-300">
                <img src="/images/quality.jpg" alt="Quality" className="mx-auto mb-4 w-16 h-16 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Quality & Excellence</h3>
                <p className="text-gray-600">We maintain the highest standards in all our products.</p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-xl text-center hover:scale-105 transform transition duration-300">
                <img src="/images/sustainable.jpg" alt="Sustainability" className="mx-auto mb-4 w-16 h-16 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-600">We are committed to ethical practices and eco-friendly products.</p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-xl text-center hover:scale-105 transform transition duration-300">
                <img src="/images/innovation.jpg" alt="Innovation" className="mx-auto mb-4 w-16 h-16 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We continuously innovate to create products that meet modern beauty needs.</p>
            </div>
            </div>
        </section>

        <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-acsent mb-6">Our Story</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
            Beauty Cosmetics started with a simple goal: to make high-quality, safe, and effective beauty products accessible to everyone. Our team of experts works tirelessly to ensure every product reflects our passion and dedication to beauty, wellness, and sustainability.
            </p>
        </section>

        <section className="text-center py-16 bg-acsent rounded-xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Beauty Like Never Before</h2>
            <p className="text-lg md:text-xl mb-6">Explore our wide range of products crafted with care and love.</p>
            <a href="/products" className="px-8 py-3 bg-white text-acsent font-semibold rounded-lg hover:bg-gray-100 transition">
            Shop Now
            </a>
        </section>
        </div>
    );
};

export default About;
