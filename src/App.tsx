import { useEffect, useState } from "react";
import Features from "./assets/Pages/Features";
import Footer from "./assets/Pages/Footer";
import Hero from "./assets/Pages/Hero";
import Navbar from "./assets/Pages/Navbar";
import Pricing from "./assets/Pages/Pricing";
import Testimonials from "./assets/Pages/Testimonials";
import { ContactServices } from "./services/ContactServices";
import type { ContactViewModel } from "./models/Contacts";

function App() {
    const [contacts, setContacts] = useState<any[]>([]); 
    
    const [createData, setCreateData] = useState<ContactViewModel>({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: ''
});

const [updateData, setUpdateData] = useState<ContactViewModel>({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: ''
});

    const [selectedContactId, setSelectedContactId] = useState<number>(0);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const fetchData = async () => {
        ContactServices.get(1, 10)
            .then((res) => {
                setContacts(res.data || []);
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createRecord = () => {
        ContactServices.create(createData)
            .then(() => {
                fetchData();
                setCreateData({ id: 0, firstname: '', lastname: '', email: '', phone: '', birthdate: '' });
                alert('Contact created successfully!');
            })
            .catch((err) => console.error('Error creating contact:', err));
    };

    const updateRecord = (id: number) => {
        ContactServices.update(id, updateData)
            .then(() => {
                fetchData();
                alert('Contact updated successfully!');
            })
            .catch((err) => console.error('Error updating contact:', err));
    };

    const deleteRecord = (id: number) => {
        ContactServices.delete(id)
            .then(() => {
                fetchData();
                setShowDeleteConfirmation(false);
                alert('Contact deleted successfully!');
            })
            .catch((err) => console.error('Error deleting contact:', err));
    };

    const handleEditSelection = (contact: any) => {
        setSelectedContactId(contact.id);
        setUpdateData(contact);
    };

    return (
        <div className="py-4 bg-slate-950 text-white overflow-hidden">
            <Navbar />
            <Hero />
            <Features />

            <div className="p-8">
                <div className="text-xl font-bold mb-6">Contacts</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
                    {contacts.length > 0 ? (
                        contacts.map((contact: any) => (
                            <div 
                                key={contact.id} 
                                onClick={() => handleEditSelection(contact)} 
                                className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:ring-2 ring-purple-500 transition-all"
                            >
                                <h3 className="text-lg font-bold">{contact.firstname} {contact.lastname}</h3>
                                <p className="text-sm text-gray-400">{contact.email}</p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedContactId(contact.id);
                                        setShowDeleteConfirmation(true);
                                    }} 
                                    className="rounded-full px-4 py-1 border border-white mt-3 text-xs hover:bg-red-500 hover:border-red-500 transition-colors"
                                >
                                    trash
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No contacts found.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-600/50">
                        <h3 className="text-lg font-bold mb-4 text-purple-400">Create Record</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input 
                                    className="bg-white w-full px-2 py-1 text-black rounded"
                                    placeholder="First Name"
                                    value={createData.firstname}
                                    onChange={(e) => setCreateData({...createData, firstname: e.target.value})}
                                />
                                <input 
                                    className="bg-white w-full px-2 py-1 text-black rounded"
                                    placeholder="Last Name"
                                    value={createData.lastname}
                                    onChange={(e) => setCreateData({...createData, lastname: e.target.value})}
                                />
                            </div>
                            <input 
                                className="bg-white w-full px-2 py-1 text-black rounded"
                                placeholder="Email"
                                value={createData.email}
                                onChange={(e) => setCreateData({...createData, email: e.target.value})}
                            />
                            <input 
                                className="bg-white w-full px-2 py-1 text-black rounded"
                                placeholder="Phone"
                                value={createData.phone}
                                onChange={(e) => setCreateData({...createData, phone: e.target.value})}
                            />
                            <button onClick={createRecord} className="w-full bg-purple-500 py-2 rounded-md hover:bg-purple-600 font-bold">
                                Submit New Contact
                            </button>
                        </div>
                    </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-yellow-600/50">
                            <h3 className="text-lg font-bold mb-4 text-yellow-500">Update Record: {updateData.firstname}</h3>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input 
                                        className="bg-white w-full px-2 py-1 text-black rounded"
                                        value={updateData.firstname}
                                        onChange={(e) => setUpdateData({...updateData, firstname: e.target.value})}
                                    />
                                    <input 
                                        className="bg-white w-full px-2 py-1 text-black rounded"
                                        value={updateData.lastname}
                                        onChange={(e) => setUpdateData({...updateData, lastname: e.target.value})}
                                    />
                                </div>
                                <input 
                                    className="bg-white w-full px-2 py-1 text-black rounded"
                                    value={updateData.email}
                                    onChange={(e) => setUpdateData({...updateData, email: e.target.value})}
                                />
                                <input 
                                    className="bg-white w-full px-2 py-1 text-black rounded"
                                    value={updateData.phone}
                                    onChange={(e) => setUpdateData({...updateData, phone: e.target.value})}
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => updateRecord(selectedContactId)} className="w-full bg-yellow-600 py-2 rounded-md hover:bg-yellow-700 font-bold text-black">
                                        Update Record
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            {showDeleteConfirmation && (
                <div className="flex justify-center">
                <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full">
                        <p className="text-center mb-6">Are you sure you want to delete this contact? {selectedContactId}</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setShowDeleteConfirmation(false)} className="px-4 py-1">Cancel</button>
                            <button onClick={() => deleteRecord(selectedContactId)} className="bg-red-500 px-6 py-1 rounded-md font-bold">Delete</button>
                        </div>
                </div>
                </div>
            )}

            <Pricing />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default App;