import React from "react";

interface FooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

const Footer: React.FC<FooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
        {text}{" "}
        <a
          href={linkHref}
          className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:underline"
        >
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default Footer;
