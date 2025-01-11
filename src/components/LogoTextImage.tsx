import logo from "@/../public/logoText.png";
import Image from "next/image";

export default function LogoTextImage() {
    return <Image src={logo} alt="Varna Gardens Logo" />;
}