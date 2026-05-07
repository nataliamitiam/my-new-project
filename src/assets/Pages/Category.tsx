import { useEffect, useState } from "react";
import { CategoryServices } from "../../services/CategoryServices";
import { categoryDefaultValue, type CategoryViewModel } from "../../models/Category";

export function Category() {
  const [category, setCategory] = useState<any[]>([]);
  const [createData, setCreateData] = useState<CategoryViewModel>(categoryDefaultValue);
  const [categoryId, setCateogryId] = useState<number>(0);
  const [updateData, setUpdateData] = useState<CategoryViewModel>(categoryDefaultValue);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch Data
  const fetchData = async () => {
   CategoryServices.get(1, 10)
   .then((res) => {
    setCategory(res.data || []);
   })
   .catch((err) => console.error('Error fetchig data:', err))
  };

  useEffect(() => {
    fetchData();
  }, []);

   // Create Record
  const createRecord = () => {
      const { id, ...payload } = createData;
      CategoryServices.create(payload as any)
      .then(() => {
        fetchData();
        setCreateData(categoryDefaultValue);
        alert('Category Created!');
      })
      .catch((err) => console.error(
        'Error creating category:', err
      ));
  };

   // Update
  const updateRecord = (id: number) => {
    CategoryServices.update(id, updateData)
    .then(() => {
      fetchData();
      alert('Category updated!')
    }).catch((err) => {
      console.error('Error updating contact:', err)
    })
  };

 // Delete
  const deleteRecord = async (id: number) => {
    try {
      await CategoryServices.delete(id);

      fetchData();
      setShowDeleteConfirmation(false);

      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category.");
    }
  };

  // const handleEditSelection = (category: any) => {
  //   setCateogryId(category.id);
  // }

  return (
    <>
      {/* LIST */}
      <div className="grid grid-cols-3 gap-5">
        {category.length > 0 ? (
          category.map((category) => {
            return (
            <div
              key={category.id}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-2">
                Description: {category.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setUpdateData(category);
                    setCateogryId(category.id);
                  }}
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                onClick={() => {
                  setCateogryId(category.id);
                  console.log(category.id);
                  setShowDeleteConfirmation(true)}}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          )})
        ) : (
          <p className="text-center text-white">
            No category found.
          </p>
        )}
      </div>

      {/* CREATE FORM */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-600/50 mt-6">
        <h3 className="text-lg font-bold mb-4 text-purple-400">
          Create Category
        </h3>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              className="bg-white w-full px-2 py-1 text-black rounded"
              placeholder="Category Name"
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
            Submit Category
          </button>
        </div>
      </div>

      {/* UPDATE FORM */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600/50 mt-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">
          Update Category
        </h3>

        <div className="space-y-3">
          <input
            className="bg-white w-full px-2 py-1 text-black rounded"
            placeholder="Category Name"
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
            onClick={() => updateRecord(categoryId)}
            className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 font-bold"
          >
            Update Category
          </button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <>
        <div>Are you sure to delete this? {categoryId}
        </div>
        <button onClick={() => deleteRecord(categoryId)}>Delete</button>
        </>
      )}
    </>
  );
}