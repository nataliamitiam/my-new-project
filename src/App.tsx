import { useEffect, useState } from "react";
import Features from "./assets/Pages/Features";
import Footer from "./assets/Pages/Footer";
import Hero from "./assets/Pages/Hero";
import Navbar from "./assets/Pages/Navbar";
import Pricing from "./assets/Pages/Pricing";
import Testimonials from "./assets/Pages/Testimonials";
import { ContactServices } from "./services/ContactServices";
import { contactsDefaultValue } from "./models/Contacts";

function App() {

    const [data, setData] = useState<any>(contactsDefaultValue);

    const fetchData = async () => {
        ContactServices.get(1, 10)
        .then((res) => {
            setData(res);
            console.log('data:', res);
        }).catch((err) => {console.error('Error fetching data:', err);
        }).finally(() => {console.log('Fetch data completed');
        });
    }

    useEffect(() => {
        fetchData();
    }, [1, 10]);

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
             <Navbar />
             <Hero />
             <Features />
             <Pricing />
             <Testimonials />
             <Footer />
             
             <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );

}

export default App;