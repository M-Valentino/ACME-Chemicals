import React from "react";

const footerData = [
  {
    title: "About",
    links: [
      { name: "Company", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "News", href: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Acids", href: "#" },
      { name: "Bases", href: "#" },
      { name: "Oxidizers", href: "#" },
      { name: "Solvents", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms and Conditions", href: "#" },
      { name: "Shipping Policy", href: "#" },
    ],
  },
  {
    title: "Media",
    links: [
      { name: "Sales", href: "#" },
      { name: "Support", href: "#" },
      { name: "Partnerships", href: "#" },
      { name: "Media", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <div className="bg-primary text-white p-8">
      <div className="md:flex md:flex-row md:justify-around xs:grid xs:grid-cols-2 xs:gap-4">
        {footerData.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4">
        This is not a real company or store page. Website designed and coded by
        Mark Valentino.
      </p>
    </div>
  );
};
