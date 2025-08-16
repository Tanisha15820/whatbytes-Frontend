import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const categories = ["All", "Electronics", "Clothing", "Home"];

export default function Footer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeCategory = params.get("category") || "All";

  // State to toggle About Us / Contact info
  const [openSection, setOpenSection] = useState(null); // "about" | "contact" | null

  function updateCategory(cat) {
    const url = new URL(window.location.href);
    if (cat === "All") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", cat);
    }
    navigate(url.pathname + url.search);
  }

  return (
    <footer className="bg-brand-900 text-white mt-10">
      <div className="container-wide py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Filters Section */}
        <div>
          <h4 className="font-semibold mb-3">Filters</h4>
          <ul className="space-y-1 text-white/80 flex flex-wrap gap-4">
            {categories.map(c => (
              <li
                key={c}
                className={`cursor-pointer px-2 py-1 rounded ${
                  activeCategory === c
                    ? "bg-white text-brand-900 font-semibold"
                    : "hover:bg-white hover:text-brand-900"
                }`}
                onClick={() => updateCategory(c)}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h4
            className="font-semibold mb-3 cursor-pointer hover:text-white/80"
            onClick={() =>
              setOpenSection(openSection === "about" ? null : "about")
            }
          >
            About Us
          </h4>
          {openSection === "about" && (
            <div className="bg-white text-brand-900 p-3 rounded shadow-md">
              <p>
                WhatBytes is a tech company focused on building modern web
                applications for businesses and users.
              </p>
              <p>
                We aim to provide seamless and efficient solutions for
                e-commerce and data-driven apps.
              </p>
            </div>
          )}

          <h4
            className="font-semibold mt-4 mb-3 cursor-pointer hover:text-white/80"
            onClick={() =>
              setOpenSection(openSection === "contact" ? null : "contact")
            }
          >
            Contact
          </h4>
          {openSection === "contact" && (
            <div className="bg-white text-brand-900 p-3 rounded shadow-md">
              <ul className="space-y-1">
                <li>Email: support@whatbytes.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: 123 Tech Street, Bangalore, India</li>
              </ul>
            </div>
          )}
        </div>

        {/* Social Section */}
        <div>
          <h4 className="font-semibold mb-3">Follow WhatBytes</h4>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/WhatBytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com/WhatBytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
            <a
              href="https://www.instagram.com/WhatBytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com/company/WhatBytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container-wide py-4 text-white/80 text-sm">
        © 2024 WhatBytes. All rights reserved.
      </div>
    </footer>
  );
}
