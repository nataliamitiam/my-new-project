import { Bars4Icon } from "@heroicons/react/24/outline";
import { HeroIcon } from "../HeroIcon";
import { useState } from "react";
import { NavLinks } from "../../components/NavLinks";
import { MobileMenu } from "../../components/cards/MobileMenu";

const mobileMenuItems = ["Features", "Pricing", "About", "Testimonials"];

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-red-950/20 backdrop-blur-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">

                    <div className="flex items-center space-x-1 cursor-pointer">
                        <div>
                            <HeroIcon />
                        </div>
                        <div className="text-lg sm:text-md md:text-2xl font-medium">
                            <span className="text-white">Code</span>
                            <span className="text-blue-400">Flow</span>
                        </div>
                    </div>

                    <div className="lg:block md:block hidden flex items-center space-x-8">
                        <NavLinks>Features</NavLinks>
                        <NavLinks>Pricing</NavLinks>
                        <NavLinks>About</NavLinks>
                        <NavLinks>Testimonials</NavLinks>
                    </div>

                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
                            <Bars4Icon className="text-blue-500 w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuIsOpen && (
                <div className="px-4 py-2 md:hidden flex flex-col gap-2 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
                    {mobileMenuItems.map((item) => (
                        <MobileMenu key={item} title={""}>
                            {item}
                        </MobileMenu>
                    ))}
                </div>
            )}
        </nav>
    );
}