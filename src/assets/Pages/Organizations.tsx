import { useEffect, useState } from "react";
import { OrganizationServices } from "../../services/OrganizationServices";
import { ItemBox } from "../../components/cards/ItemBox";
import { FormsContainer } from "../../components/forms/FormsContainer";

// simple default value
const defaultOrganization = {
  id: 0,
  name: "",
  description: "",
};

export function Organization() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [createData, setCreateData] = useState(defaultOrganization);
  const [orgsId, setOrgsId] = useState<number>(0)
  const [updateData, setUpdateData] = useState(defaultOrganization);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // FETCH
  const fetchData = async () => {
    try {
      const res = await OrganizationServices.get(1, 10);
      setOrgs(res.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const createRecord = async () => {
    try {
      const { id, ...payload } = createData;

      await OrganizationServices.create(payload as any);

      fetchData();
      setCreateData(defaultOrganization);

      alert("Organization created successfully!");
    } catch (err) {
      console.error("Error creating organization:", err);
      alert("Failed to create organization.");
    }
  };

  // UPDATE
  const updateRecord = async (id: number) => {
    try {
      await OrganizationServices.update(id, updateData);

      fetchData();
      alert("Organization updated successfully!");
    } catch (err) {
      console.error("Error updating organization:", err);
      alert("Failed to update organization.");
    }
  };

  // DELETE
  const deleteRecord = async (id: number) => {
    try {
      await OrganizationServices.delete(id);

      fetchData();
      setShowDeleteConfirmation(false);

      alert("Organization deleted successfully!");
    } catch (err) {
      console.error("Error deleting organization:", err);
      alert("Failed to delete organization.");
    }
  };

  return (
    <>
      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {orgs.length > 0 ? (
          orgs.map((org: any) => (
            <ItemBox key={org.id}
              onClick={() => setUpdateData(org)}
              onDelete={() => {
                setOrgsId(org.id);
                setShowDeleteConfirmation(true);
              }}>
                <h3 className="text-xl font-bold">{org.name}</h3>
                <p className="text-white">{org.description}</p>
            </ItemBox>
          ))
        ) : (
          <p className="text-center text-white">
            No organizations found.
          </p>
        )}
      </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* CREATE FORM */}
      <FormsContainer type="CreateData" title="Create Organization">
        <input
          className="bg-white w-full px-2 py-1 text-black rounded"
          placeholder="Organization Name"
          value={createData.name}
          onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
        />
        <input
          className="bg-white w-full px-2 py-1 text-black rounded"
          placeholder="Description"
          value={createData.description}
          onChange={(e) =>
            setCreateData({
              ...createData,
              description: e.target.value,
            })}
        />

        <button
          onClick={createRecord}
          className="w-full bg-purple-500 py-2 rounded-md hover:bg-purple-600 font-bold">
            Submit Organization
        </button>
      </FormsContainer>

      {/* UPDATE FORM */}
      <FormsContainer type="UpdateData" title="Update Organization">
        <input
          className="bg-white w-full px-2 py-1 text-black rounded"
          placeholder="Organization Name"
          value={updateData.name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          } />

          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Description"
            value={updateData.description}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                description: e.target.value,
              })} />
          <button
            onClick={() => updateRecord(updateData.id)}
            className="w-full bg-yellow-600 py-2 rounded-md hover:bg-yellow-700 font-bold text-black" >
              Update Organization
          </button>
      </FormsContainer>
    </div>

      {/* {showDeleteConfirmation && (
        <>
        <div>Are you sure to delete this? {orgsId}
        </div>
        <button onClick={() => deleteRecord(orgsId)}>Delete</button>
        </>
      )} */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full space-y-1.5">
            <div className="text-center mb-6">
              Are you sure you want to delete this Organization?
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeleteConfirmation(false)} className="px-4 py-1">Cancel</button>
              <button onClick={() => deleteRecord(orgsId)} className="bg-red-500 px-6 py-1 rounded-md font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}