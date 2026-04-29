import { useEffect, useState } from "react";
import { OrganizationServices } from "../../services/OrganizationServices";

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
      <div>
        {orgs.length > 0 ? (
          orgs.map((org: any) => (
            <div
              key={org.id}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold mb-2">{org.name}</h3>
              <p className="text-gray-600 mb-2">
                Description: {org.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setUpdateData(org); // load data for update
                  }}
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                onClick={() => {setOrgsId(org.id),console.log(org.id),setShowDeleteConfirmation(true)}}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No organizations found.
          </p>
        )}
      </div>

      {/* CREATE FORM */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-600/50 mt-6">
        <h3 className="text-lg font-bold mb-4 text-purple-400">
          Create Organization
        </h3>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Organization Name"
              value={createData.name}
              onChange={(e) =>
                setCreateData({ ...createData, name: e.target.value })
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
          </div>

          <button
            onClick={createRecord}
            className="w-full bg-purple-500 py-2 rounded-md hover:bg-purple-600 font-bold"
          >
            Submit Organization
          </button>
        </div>
      </div>

      {/* UPDATE FORM */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600/50 mt-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">
          Update Organization
        </h3>

        <div className="space-y-3">
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Organization Name"
            value={updateData.name}
            onChange={(e) =>
              setUpdateData({ ...updateData, name: e.target.value })
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

          <button
            onClick={() => updateRecord(updateData.id)}
            className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 font-bold"
          >
            Update Organization
          </button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <>
        <div>Are you sure to delete this? {orgsId}
        </div>
        <button onClick={() => deleteRecord(orgsId)}>Delete</button>
        </>
      )}
    </>
  );
}