import Image from "next/image";
import logo from "@/../public/logo.svg";
export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex size-40 items-center justify-center text-center font-cormorant text-4xl text-green md:text-5xl">
                Varna Gardens
            </div>
            <div className="absolute size-44 animate-spin animate-duration-[2000ms] animate-ease md:size-56">
                <div className="absolute inset-0 rotate-180 rounded-full border-r-4 border-t-4 border-green border-opacity-70"></div>

                <div className="absolute left-1/2 top-0 flex -translate-x-1/2 transform items-center justify-center">
                    <Image
                        src={logo}
                        alt="Varna Gardens Logo"
                        className="w-1/3 -translate-y-1/2 rotate-45"
                    />
                </div>
            </div>
        </div>
    );
}