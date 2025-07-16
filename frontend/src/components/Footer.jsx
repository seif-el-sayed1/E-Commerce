import { Link } from "react-router-dom";

export const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: [
                { name: "Home", to: "/" },
                { name: "Best Sellers", to: "#" },
                { name: "Offers & Deals", to: "#" },
                { name: "Contact Us", to: "#" },
                { name: "FAQs", to: "#" },
            ]
        },
        {
            title: "Need Help?",
            links: [
                { name: "Delivery Information", to: "#" },
                { name: "Return & Refund Policy", to: "#" },
                { name: "Payment Methods", to: "#" },
                { name: "Track your Order", to: "/track#" },
                { name: "Contact Us", to: "#" },
            ]
        },
        {
            title: "Follow Us",
            links: [
                { name: "Instagram", to: "#" },
                { name: "Twitter", to: "#" },
                { name: "Facebook", to: "#" },
                { name: "YouTube", to: "#" },
            ]
        }
    ];

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-[#1A1A1A] text-gray-400">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-700">
                <div>
                    <Link to="/">
                        <h1 className="text-2xl md:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#1E88E5] to-[#90CAF9]">
                            Tech Zone
                        </h1>
                    </Link>
                    <p className="max-w-[410px] mt-6 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
                    </p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-10">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-white font-semibold text-base mb-3 md:mb-5">{section.title}</h3>
                            <ul className="text-sm space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            to={link.to}
                                            className="hover:text-white transition duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                © 2025 <Link to="/" className="hover:text-white transition">Tech Zone</Link>. All Rights Reserved.
            </p>
        </footer>
    );
};
