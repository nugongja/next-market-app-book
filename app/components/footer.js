import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <p>@{new Date().getFullYear()} Next Market</p>
    </footer>
  );
};

export default Footer;
