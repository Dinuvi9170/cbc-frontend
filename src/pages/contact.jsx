import { useState } from "react";
import { BsEnvelope, BsTelephone, BsGeoAlt } from "react-icons/bs";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add API call here
        console.log(formData);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="pt-[120px] pb-5 px-6 md:px-16 lg:px-32 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-acsent mb-12">
            Get in Touch
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="text-acsent text-2xl mt-1">
                <BsGeoAlt />
                </div>
                <div>
                <h3 className="font-semibold text-xl mb-1">Address</h3>
                <p className="text-gray-700">
                    123 Beauty Street, Kandy, Sri Lanka
                </p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="text-acsent text-2xl mt-1">
                <BsEnvelope />
                </div>
                <div>
                <h3 className="font-semibold text-xl mb-1">Email</h3>
                <p className="text-gray-700">info@beautycosmetics.com</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="text-acsent text-2xl mt-1">
                <BsTelephone />
                </div>
                <div>
                <h3 className="font-semibold text-xl mb-1">Phone</h3>
                <p className="text-gray-700">+94 123 456 789</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold text-xl mb-3">Follow Us</h3>
                <div className="flex gap-4 text-acsent">
                <a href="#" className="hover:text-acsent/80 transition">Facebook</a>
                <a href="#" className="hover:text-acsent/80 transition">Instagram</a>
                <a href="#" className="hover:text-acsent/80 transition">Twitter</a>
                </div>
            </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acsent"
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acsent"
            />
            <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acsent"
            />
            <button
                type="submit"
                className="w-full py-3 bg-acsent text-white font-semibold rounded-lg hover:bg-acsent/90 transition"
            >
                Send Message
            </button>
            </form>
        </div>

        <div className="mt-16 w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
            title="Beauty Cosmetics Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.123456789!2d80.632!3d7.290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae372c123456789%3A0x123456789abcdef!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            ></iframe>
        </div>
        </div>
    );
};

export default Contact;
