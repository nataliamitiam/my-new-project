import { Bars4Icon } from "@heroicons/react/24/outline";
import { HeroIcon } from "../HeroIcon";
import { useState } from "react";
export default function Navbar() {
    const [mobileMenuisOpen, setMobileMenuIsOpen] = useState(false);
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

                    {/* Nav Links */}
                    <div className="lg:block md:block hidden flex items-center space-x-8">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Testimonials</a>
                    </div>

                    <div className="lg:hidden">
                    <button className="" onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
                        <Bars4Icon className="text-blue-500 w-8 h-8"/>
                    </button>
                    </div>
                </div>
            </div>

            {mobileMenuisOpen && (
                <div className="px-4 py-2 md:hidden flex justify-between bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
                     <a href="#" onClick={() => setMobileMenuIsOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                     <a href="#" onClick={() => setMobileMenuIsOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
                     <a href="#" onClick={() => setMobileMenuIsOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
                     <a href="#" onClick={() => setMobileMenuIsOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200">Testimonials</a>
            
            </div>)}
        </nav>
    );
}