import { useEffect, useState } from "react";
import { EstimatesServices } from "../../services/EstimatesServices";
import {
  estimatesDefaultValue,
  type EstimatesViewModel,
} from "../../models/Estimates";

export function Estimates() {
  const [estimates, setEstimates] = useState<EstimatesViewModel[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [createData, setCreateData] =
    useState<EstimatesViewModel>(estimatesDefaultValue);
  const [updateData, setUpdateData] =
    useState<EstimatesViewModel>(estimatesDefaultValue);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const res = await EstimatesServices.get(1, 10);
      setEstimates(res.data || []);
    } catch (err) {
      console.error("Error fetching estimates:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const createRecord = async () => {
    try {
      const { id, ...payload } = createData;
      await EstimatesServices.create(payload as any);
      await fetchData();
      setCreateData(estimatesDefaultValue);
      alert("Estimate created successfully!");
    } catch (err) {
      console.error("Error creating estimate:", err);
    }
  };

  // EDIT SELECT
  const handleEdit = (estimate: EstimatesViewModel) => {
    setSelectedId(estimate.id);
    setUpdateData(estimate);
  };

  // UPDATE
  const updateRecord = async () => {
    try {
      await EstimatesServices.update(selectedId, updateData);
      await fetchData();
      setUpdateData(estimatesDefaultValue);
      setSelectedId(0);
      alert("Estimate updated successfully!");
    } catch (err) {
      console.error("Error updating estimate:", err);
    }
  };

  // DELETE
  const deleteRecord = async () => {
    try {
      await EstimatesServices.delete(selectedId);
      await fetchData();
      setShowDeleteConfirmation(false);
      setSelectedId(0);
      alert("Estimate deleted successfully!");
    } catch (err) {
      console.error("Error deleting estimate:", err);
      alert("Failed to delete estimate.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/*LIST*/}
      <div>
        <h1 className="text-2xl font-bold mb-4">Estimates</h1>
      {estimates.length > 0 ? (
          estimates.map((estimate) => (
            <div
              key={estimate.id}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold">{estimate.name}</h3>

              <p className="text-gray-600">
                Description: {estimate.description}
              </p>

              <p className="text-gray-600">
                Amount: {estimate.amount}
              </p>

              <p className="text-gray-600">
                Start Date: {estimate.startDate}
              </p>

              <p className="text-gray-600">
                End Date: {estimate.endDate}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(estimate)}
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedId(estimate.id);
                    setShowDeleteConfirmation(true);
                  }}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No estimates found.</p>
        )}
      </div>

      {/*CREATE FORM*/}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-600/50">
        <h3 className="text-lg font-bold mb-4 text-purple-400">
          Create Estimate
        </h3>

        <div className="space-y-3">
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Name"
            value={createData.name}
            onChange={(e) =>
              setCreateData({
                ...createData,
                name: e.target.value,
              })
            }
          />

          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Description"
            value={createData.description}
            onChange={(e) =>
              setCreateData({
                ...createData,
                description: e.target.value,
              })
            }
          />

          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="number"
            placeholder="Amount"
            value={createData.amount}
            onChange={(e) =>
              setCreateData({
                ...createData,
                amount: Number(e.target.value),
              })
            }
          />

          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="date"
            value={createData.startDate}
            onChange={(e) =>
              setCreateData({
                ...createData,
                startDate: e.target.value,
              })
            }
          />
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="date"
            value={createData.endDate}
            onChange={(e) =>
              setCreateData({
                ...createData,
                endDate: e.target.value,
              })
            }
          />
          <button
            onClick={createRecord}
            className="w-full bg-purple-500 py-2 rounded-md hover:bg-purple-600 font-bold"
          >
            Create
          </button>
        </div>
      </div>

      {/*UPDATE FORM*/}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600/50">
        <h3 className="text-lg font-bold mb-4 text-blue-400">
          Update Estimate
        </h3>

        <div className="space-y-3">
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Name"
            value={updateData.name}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                name: e.target.value,
              })
            }
          />

          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Description"
            value={updateData.description}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                description: e.target.value,
              })
            }
          />
         <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="number"
            placeholder="Amount"
            value={updateData.amount}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                amount: Number(e.target.value),
              })
            }
          />
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="date"
            value={updateData.startDate}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                startDate: e.target.value,
              })
            }
          />
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            type="date"
            value={updateData.endDate}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                endDate: e.target.value,
              })
            }
          />
          <button
            onClick={updateRecord}
            className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 font-bold"
          >
            Update
          </button>
        </div>
      </div>

      {/*DELETE MODAL*/}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-5 rounded-lg space-y-4">
            <p>Delete this estimate?</p>

            <div className="flex gap-2">
              <button
                onClick={deleteRecord}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}