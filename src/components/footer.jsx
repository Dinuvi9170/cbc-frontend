import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-acsent text-gray-300 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <div className="md:w-[500px] flex flex-col gap-4">
                <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                    <img
                    src={"/beautylogoremovebgpreview.png"}
                    className="w-16 h-16 object-cover"
                    alt="Logo"
                    />
                </div>
                <h2 className="text-2xl font-bold text-white">Beauty Cosmetics</h2>
                </div>
                <p className="text-white">
                Premium beauty products for skincare, haircare, and makeup. 
                Enhancing your natural glow with quality and style.
                </p>
            </div>

            <div className="md:flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-white transition">Home</a></li>
                    <li><a href="/products" className="hover:text-white transition">Products</a></li>
                    <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                    <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                </ul>
                </div>

                <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Categories</h2>
                <ul className="space-y-2">
                    <li><a href="/categories/Makeup" className="hover:text-white transition">MakeUp</a></li>
                    <li><a href="/categories/Skincare" className="hover:text-white transition">Skincare</a></li>
                    <li><a href="/categories/Haircare" className="hover:text-white transition">Haircare</a></li>
                    <li><a href="/categories/Fragrance" className="hover:text-white transition">Fragrances</a></li>
                    <li><a href="/categories/Bodycare" className="hover:text-white transition">Bath & Body</a></li>
                    <li><a href="/categories/Other" className="hover:text-white transition">Other</a></li>
                </ul>
                </div>

                <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Follow Us</h2>
                <div className="flex space-x-4 text-white text-lg">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><FaFacebookF /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><FaInstagram /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><FaTwitter /></a>
                </div>
                </div>
            </div>
            </div>

            <div className="border-t border-white mt-10 pt-6 text-center text-white text-sm">
            &copy; {new Date().getFullYear()} Beauty Cosmetics. All rights reserved.
            </div>
        </div>
        </footer>
    );
};

export default Footer;
