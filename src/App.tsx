import Features from "./assets/Pages/Features";
import Footer from "./assets/Pages/Footer";
import Hero from "./assets/Pages/Hero";
import Navbar from "./assets/Pages/Navbar";
import Pricing from "./assets/Pages/Pricing";
import Testimonials from "./assets/Pages/Testimonials";
import { Organizations } from "./assets/Pages/Organizations";
import { Contacts } from "./assets/Pages/Contacts";

function App() {

    return (
        <div className="py-4 bg-slate-950 text-white overflow-hidden">
            <Navbar />
            <Hero />
            <Features />

            <Contacts />
            <Organizations />

            <Pricing />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default App;