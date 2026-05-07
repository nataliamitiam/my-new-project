import { useState, useEffect } from "react";
import { ContactServices } from "../../services/ContactServices";
import { contactsDefaultValue, type ContactViewModel } from "../../models/Contacts";
import { ItemBox } from "../../components/cards/ItemBox";
import { FormsContainer } from "../../components/forms/FormsContainer";
import { FormsButton } from "../../components/forms/FormsButton";
import { InputText } from "../../components/forms/InputText";

export function Contacts() {

  const [contacts, setContacts] = useState<any[]>([]);
  const [createData, setCreateData] = useState<ContactViewModel>(contactsDefaultValue);
  const [updateData, setUpdateData] = useState<ContactViewModel>(contactsDefaultValue);

  const [selectedContactId, setSelectedContactId] = useState<number>(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch Data
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

  // Create Record
  const createRecord = () => {
    const { id, ...payload } = createData;
    ContactServices.create(payload as any)
      .then(() => {
        fetchData();
        setCreateData(contactsDefaultValue);
        alert('Contact created successfully!');
      })
      .catch((err) => console.error('Error creating contact:', err));
  };

  // Update
  const updateRecord = (id: number) => {
    ContactServices.update(id, updateData)
      .then(() => {
        fetchData();
        alert('Contact updated successfully!');
      })
      .catch((err) => console.error('Error updating contact:', err));
  };

   // Delete
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
    setUpdateData({
      ...contact,
      birthDate: (contact.birthDate || contact.birthdate || '').split('T')[0]
    });
  };

  return (
    <>
        {/* Contact List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contacts.length > 0 ? (
            contacts.map((contact: any) => (
              <ItemBox key={contact.id}
                onClick={() => handleEditSelection(contact)}
                onDelete={() => {
                  setSelectedContactId(contact.id);
                  setShowDeleteConfirmation(true);
                }}>
                <h3 className="text-xl font-bold">{contact.firstname} {contact.lastname}</h3>
                <p className="text-white">{contact.email}</p>
              </ItemBox>
            ))
          ) : (
            <p className="text-center text-whit">
            No Contacts found.
          </p>
          )}
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Create Form */}
          <FormsContainer type="CreateData" title="Create Record">
            <div className="flex gap-2">
                <input
                  className="bg-white w-full px-2 py-1 text-black rounded"
                  placeholder="First Name"
                  value={createData.firstname}
                  onChange={(e) => setCreateData({ ...createData, firstname: e.target.value })}
                />
                <input
                  className="bg-white w-full px-2 py-1 text-black rounded"
                  placeholder="Last Name"
                  value={createData.lastname}
                  onChange={(e) => setCreateData({ ...createData, lastname: e.target.value })}
                />
            </div>
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Email"
              value={createData.email}
              onChange={(e) => setCreateData({ ...createData, email: e.target.value })}
            />
            <input
              type="date"
              className="bg-white w-full px-2 py-1 text-black rounded"
              value={createData.birthDate}
              onChange={(e) => setCreateData({ ...createData, birthDate: e.target.value })}
            />
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Phone"
              value={createData.phone}
              onChange={(e) => setCreateData({ ...createData, phone: e.target.value })}
            />
            <FormsButton type="Create" onClick={createRecord}>
              Save
            </FormsButton>
          </FormsContainer>

          {/* Update Form */}
          <FormsContainer type="UpdateData" title={`Update Record: ${updateData.firstname}`}>
            <div className="flex gap-2">
              <InputText
                value={updateData.firstname}
                onChange={(e: any) => setUpdateData({
                  ...updateData, firstname: e.target.value
                })} />
                <input
                  className="bg-white w-full px-2 py-1 text-black rounded"
                  placeholder="Lastname"
                  value={updateData.lastname}
                  onChange={(e) => setUpdateData({ ...updateData, lastname: e.target.value })} />
            </div>
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Email"
              value={updateData.email}
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })} />
            <input
              type="date"
              className="bg-white w-full px-2 py-1 text-black rounded"
              value={updateData.birthDate}
              onChange={(e) => setUpdateData({ ...updateData, birthDate: e.target.value })} />
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Phone"
              value={updateData.phone}
              onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })} />
            <FormsButton type="Update"
              onClick={() => updateRecord(selectedContactId)}>
              Update
            </FormsButton>
          </FormsContainer>
        </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        // PopUp Delete {Delete Modal}
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full space-y-1.5">
            <div className="text-center mb-6">
              Are you sure you want to delete this contact?
              {/* title Parameter for Prop */}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => 
                setShowDeleteConfirmation(false)
                // onClose Prop
                } className="px-4 py-1">Cancel</button>
              <button onClick={() => 
                deleteRecord(selectedContactId)
                // DeleteRecord Prop
              } className="bg-red-500 px-6 py-1 rounded-md font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}