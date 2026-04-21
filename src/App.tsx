import Features from "./assets/Pages/Features";
import Footer from "./assets/Pages/Footer";
import Hero from "./assets/Pages/Hero";
import Navbar from "./assets/Pages/Navbar";
import Pricing from "./assets/Pages/Pricing";
import Testimonials from "./assets/Pages/Testimonials";

function App() {

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
             <Navbar />
             <Hero />
             <Features />
             <Pricing />
             <Testimonials />
             <Footer />
        </div>
    );

}

export default App;