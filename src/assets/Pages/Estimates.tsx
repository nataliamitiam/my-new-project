import { useState, useEffect } from "react";
import { EstimatesServices } from "../../services/EstimatesServices";
import { estimatesDefaultValue, type EstimatesViewModel } from "../../models/Estimates";

export function Estimates() {
  const [estimates, setEstimates] = useState<EstimatesViewModel[]>([]);
  const [createData, setCreateData] = useState<EstimatesViewModel>(estimatesDefaultValue);
  const [,setselectId] = newFunction();
  const [updateData, setUpdateData] = useState<EstimatesViewModel>(estimatesDefaultValue);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch Data
  const fetchData = async () => {
      EstimatesServices.get(1, 10)
        .then((res) => {
          setEstimates(res.data || []);
        })
        .catch((err) => console.error('Error fetching data:', err));
    };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Create Record
  const createRecord = async () => {
    try {
      const { id, ...payload } = createData;
      EstimatesServices.create(payload as any);
      fetchData();
      setCreateData(estimatesDefaultValue);
      alert("Estimate created successfully!");
    } catch (err) {
      console.error("Error creating estimate:", err);
    }
  };

  // Update
   const updateRecord = (id: number) => {
     EstimatesServices.update(id, updateData)
        .then(() => {
          fetchData();
          alert('Estimates updated successfully!');
        })
        .catch((err) => console.error('Error updating contact:', err));
    };
  
  // Delete
   const deleteRecord = (id: number) => {
      EstimatesServices.delete(id)
        .then(() => {
          fetchData();
          setShowDeleteConfirmation(false);
          alert('Estimates deleted successfully!');
        })
        .catch((err) => console.error('Error deleting contact:', err));
    };

  const handleEditSelection = (estimates: any) => {
    setselectId(estimates);
    setUpdateData({
      ...estimates,
      birthDate: (estimates.birthDate || estimates.birthdate || '').split('T')[0]
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">Estimates</h1>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {estimates.length ? (
          estimates.map((item) => (
            <div
              key={item.id}
              onClick={() => handleEditSelection(item)}
              className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:ring-2 ring-purple-500"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setselectId(item.id);
                  setShowDeleteConfirmation(true);
                }}
                className="mt-3 text-xs border px-3 py-1 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No estimates found.</p>
        )}
      </div>

      {/* Forms Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* CREATE form */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-purple-400 font-bold mb-4">Create</h3>

          <input
            placeholder="Name"
            value={createData.name}
            onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={createData.description}
            onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
          />

            <input type="number"
          placeholder="Amount"
          value={updateData.amount}
          onChange={(e) => setUpdateData({...updateData, amount: Number(e.target.value),
    })
  }
/>
            <input
            placeholder="Start Date"
            value={createData.startDate}
            onChange={(e) => setCreateData({ ...createData, startDate: e.target.value })}
          />
        
            <input
            placeholder="End Date"
            value={createData.endDate}
            onChange={(e) => setCreateData({ ...createData, endDate: e.target.value })}
          />

          <button onClick={createRecord}>Create</button>
        </div>

        {/* UPDATE */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-yellow-400 font-bold mb-4">Update</h3>

          <input
            placeholder="Name"
            value={updateData.name}
            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={updateData.description}
            onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
          />
         <input type="number"
          placeholder="Amount"
          value={updateData.amount}
          onChange={(e) => setUpdateData({
      ...updateData, amount: Number(e.target.value),
    })
  }
/>

          <input
            placeholder="Start Date"
            value={updateData.startDate}
            onChange={(e) => setUpdateData({ ...updateData, startDate: e.target.value })}
          />
          
          <input
            placeholder="End Date"
            value={updateData.endDate}
            onChange={(e) => setUpdateData({ ...updateData, endDate: e.target.value })}
          />

          <button
          onClick={() => updateRecord}>Update</button>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-5 rounded">
            <p>Delete this estimate?</p>
            <button onClick={() => deleteRecord}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );

  function newFunction(): [any, any] {
    return useState<number>(0);
  }
}