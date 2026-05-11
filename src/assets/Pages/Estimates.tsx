import { useEffect, useState } from "react";
import { EstimatesServices } from "../../services/EstimatesServices";
import {
  estimatesDefaultValue,
  type EstimatesViewModel,
} from "../../models/Estimates";

import { InputText } from "../../components/forms/InputText";
import { FormsButton } from "../../components/forms/FormsButton";
import { FormsContainer } from "../../components/forms/FormsContainer";
import { ItemBox } from "../../components/cards/ItemBox";

export function Estimates() {
  const [estimates, setEstimates] =
    useState<EstimatesViewModel[]>([]);

  const [selectedId, setSelectedId] =
    useState<number>(0);

  const [createData, setCreateData] =
    useState<EstimatesViewModel>(
      estimatesDefaultValue
    );

  const [updateData, setUpdateData] =
    useState<EstimatesViewModel>(
      estimatesDefaultValue
    );

  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const res =
        await EstimatesServices.get(1, 10);

      setEstimates(res.data || []);
    } catch (error) {
      console.error(
        "Error fetching estimates:",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CREATE =================
  const createRecord = async () => {
    try {
      const { id, ...payload } = createData;

      await EstimatesServices.create(
        payload as any
      );

      await fetchData();

      setCreateData(estimatesDefaultValue);

      alert("Estimate created successfully!");
    } catch (error) {
      console.error(
        "Error creating estimate:",
        error
      );
    }
  };

  // ================= SELECT =================
  const handleEdit = (
    estimate: EstimatesViewModel
  ) => {
    setSelectedId(estimate.id);
    setUpdateData(estimate);
  };

  // ================= UPDATE =================
  const updateRecord = async () => {
    try {
      await EstimatesServices.update(
        selectedId,
        updateData
      );

      await fetchData();

      setUpdateData(estimatesDefaultValue);
      setSelectedId(0);

      alert("Estimate updated successfully!");
    } catch (error) {
      console.error(
        "Error updating estimate:",
        error
      );
    }
  };

  // ================= DELETE =================
  const deleteRecord = async () => {
    try {
      await EstimatesServices.delete(
        selectedId
      );

      await fetchData();

      setShowDeleteConfirmation(false);
      setSelectedId(0);

      alert("Estimate deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting estimate:",
        error
      );

      alert("Failed to delete estimate.");
    }
  };

  // ================= HANDLE CHANGES =================
  const handleCreateChange = (
    key: keyof EstimatesViewModel,
    value: string | number
  ) => {
    setCreateData({
      ...createData,
      [key]: value,
    });
  };

  const handleUpdateChange = (
    key: keyof EstimatesViewModel,
    value: string | number
  ) => {
    setUpdateData({
      ...updateData,
      [key]: value,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {estimates.length > 0 ? (
          estimates.map((estimate) => (
            <ItemBox
              key={estimate.id}
              onClick={() => handleEdit(estimate)}
              onDelete={() => {
                setSelectedId(estimate.id);
                setShowDeleteConfirmation(true);
              }}
            >
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold">
                    {estimate.name}
                  </h3>

                  <p className="text-gray-300">
                    {estimate.description}
                  </p>

                  <div className="mt-2 text-sm text-gray-400 space-y-1">
                    <p>
                      Amount: {estimate.amount}
                    </p>

                    <p>
                      Start:{" "}
                      {estimate.startDate?.split(
                        "T"
                      )[0]}
                    </p>

                    <p>
                      End:{" "}
                      {estimate.endDate?.split(
                        "T"
                      )[0]}
                    </p>
                  </div>
                </div>

              </div>
            </ItemBox>
          ))
        ) : (
          <p className="text-gray-400">
            No estimates found.
          </p>
        )}
      </div>

      {/* ================= FORMS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CREATE FORM */}
        <FormsContainer
          type="CreateData"
          title="Create Record"
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <InputText
                placeholder="Name"
                value={createData.name}
                onChange={(e) =>
                  handleCreateChange(
                    "name",
                    e.target.value
                  )
                }
              />

              <InputText
                placeholder="Description"
                value={createData.description}
                onChange={(e) =>
                  handleCreateChange(
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            <InputText
              placeholder="Amount"
              value={createData.amount}
              onChange={(e) =>
                handleCreateChange(
                  "amount",
                  Number(e.target.value)
                )
              }
            />

            <InputText
              type="date"
              placeholder="Start Date"
              value={createData.startDate}
              onChange={(e) =>
                handleCreateChange(
                  "startDate",
                  e.target.value
                )
              }
            />

            <InputText
              type="date"
              placeholder="End Date"
              value={createData.endDate}
              onChange={(e) =>
                handleCreateChange(
                  "endDate",
                  e.target.value
                )
              }
            />

            <FormsButton
              type="Create"
              onClick={createRecord}
            >
              Save
            </FormsButton>
          </div>
        </FormsContainer>

        {/* UPDATE FORM */}
        <FormsContainer
          type="UpdateData"
          title={`Update Record: ${updateData.name}`}
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <InputText
                placeholder="Name"
                value={updateData.name}
                onChange={(e) =>
                  handleUpdateChange(
                    "name",
                    e.target.value
                  )
                }
              />

              <InputText
                placeholder="Description"
                value={updateData.description}
                onChange={(e) =>
                  handleUpdateChange(
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            <InputText
              placeholder="Amount"
              value={updateData.amount}
              onChange={(e) =>
                handleUpdateChange(
                  "amount",
                  Number(e.target.value)
                )
              }
            />

            <InputText
              type="date"
              placeholder="Start Date"
              value={updateData.startDate}
              onChange={(e) =>
                handleUpdateChange(
                  "startDate",
                  e.target.value
                )
              }
            />

            <InputText
              type="date"
              placeholder="End Date"
              value={updateData.endDate}
              onChange={(e) =>
                handleUpdateChange(
                  "endDate",
                  e.target.value
                )
              }
            />

            <FormsButton
              type="Update"
              onClick={updateRecord}
            >
              Update
            </FormsButton>
          </div>
        </FormsContainer>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full space-y-4">
            <div className="text-center">
              Are you sure you want to delete
              this estimate?
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  setShowDeleteConfirmation(false)
                }
                className="px-4 py-1"
              >
                Cancel
              </button>

              <button
                onClick={deleteRecord}
                className="bg-red-500 px-6 py-1 rounded-md font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}