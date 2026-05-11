import { useEffect, useState } from "react";
import { CategoryServices } from "../../services/CategoryServices";
import { categoryDefaultValue, type CategoryViewModel,} from "../../models/Category";
import { ItemBox } from "../../components/cards/ItemBox";
import { FormsContainer } from "../../components/forms/FormsContainer";

export function Category() {
  const [categories, setCategories] =
    useState<CategoryViewModel[]>([]);

  const [createData, setCreateData] =
    useState<CategoryViewModel>(categoryDefaultValue);

  const [updateData, setUpdateData] =
    useState<CategoryViewModel>(categoryDefaultValue);

  const [selectedId, setSelectedId] =
    useState<number>(0);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  // FETCH CATEGORIES 
  const fetchCategories = async () => {
    try {
      const res = await CategoryServices.get(1, 10);

      setCategories(res.data || []);
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE CATEGORY
  const createCategory = async () => {
    try {
      const { id, ...payload } = createData;

      await CategoryServices.create(payload as any);

      await fetchCategories();

      setCreateData(categoryDefaultValue);

      alert("Category Created!");
    } catch (error) {
      console.error(
        "Error creating category:",
        error
      );

      alert("Failed to create category.");
    }
  };

  // SELECT CATEGORY
  const handleSelectCategory = (
    category: CategoryViewModel
  ) => {
    setUpdateData(category);
    setSelectedId(category.id);
  };

  // UPDATE CATEGORY
  const updateCategory = async () => {
    if (!selectedId) return;

    try {
      await CategoryServices.update(
        selectedId,
        updateData
      );

      await fetchCategories();

      setUpdateData(categoryDefaultValue);

      setSelectedId(0);

      alert("Category Updated!");
    } catch (error) {
      console.error(
        "Error updating category:",
        error
      );

      alert("Failed to update category.");
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async () => {
    if (!selectedId) return;

    try {
      await CategoryServices.delete(selectedId);

      await fetchCategories();

      setShowDeleteModal(false);

      setSelectedId(0);

      alert("Category Deleted!");
    } catch (error) {
      console.error(
        "Error deleting category:",
        error
      );

      alert("Failed to delete category.");
    }
  };


  const handleCreateChange = (
    key: keyof CategoryViewModel,
    value: string
  ) => {
    setCreateData({
      ...createData,
      [key]: value,
    });
  };

  const handleUpdateChange = (
    key: keyof CategoryViewModel,
    value: string
  ) => {
    setUpdateData({
      ...updateData,
      [key]: value,
    });
  };

 return (
  <div className="p-6 space-y-8">
    {/* CATEGORY LIST */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {categories.length > 0 ? (
        categories.map((category) => (
          <ItemBox
            key={category.id}
            onClick={() =>
              handleSelectCategory(category)
            }
            onDelete={() => {
              setSelectedId(category.id);
              setShowDeleteModal(true);
            }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                {category.name}
              </h3>

              <p className="text-white">
                {category.description}
              </p>

            </div>
          </ItemBox>
        ))
      ) : (
        <p className="text-center text-white">
          No category found.
        </p>
      )}
    </div>

    {/* FORMS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* CREATE FORM */}
      <FormsContainer
        type="CreateData"
        title="Create Category"
      >
        <div className="space-y-3">
          <input
            className="bg-white w-full px-3 py-2 rounded text-black"
            placeholder="Category Name"
            value={createData.name}
            onChange={(e) =>
              handleCreateChange(
                "name",
                e.target.value
              )
            }
          />

          <input
            className="bg-white w-full px-3 py-2 rounded text-black"
            placeholder="Description"
            value={createData.description}
            onChange={(e) =>
              handleCreateChange(
                "description",
                e.target.value
              )
            }
          />

          <button
            onClick={createCategory}
            className="w-full bg-purple-500 py-2 rounded-md hover:bg-purple-600 font-bold"
          >
            Submit Category
          </button>
        </div>
      </FormsContainer>

      {/* UPDATE FORM */}
      <FormsContainer
        type="UpdateData"
        title="Update Category"
      >
        <div className="space-y-3">
          <input
            className="bg-white w-full px-3 py-2 rounded text-black"
            placeholder="Category Name"
            value={updateData.name}
            onChange={(e) =>
              handleUpdateChange(
                "name",
                e.target.value
              )
            }
          />

          <input
            className="bg-white w-full px-3 py-2 rounded text-black"
            placeholder="Description"
            value={updateData.description}
            onChange={(e) =>
              handleUpdateChange(
                "description",
                e.target.value
              )
            }
          />

          <button
            onClick={updateCategory}
            className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 font-bold"
          >
            Update Category
          </button>
        </div>
      </FormsContainer>
    </div>

    {/* DELETE MODAL */}
    {showDeleteModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full space-y-4">
          <div className="text-center text-white">
            Are you sure you want to delete
            this category?
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() =>
                setShowDeleteModal(false)
              }
              className="px-4 py-2 bg-gray-400 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={deleteCategory}
              className="bg-red-500 px-6 py-2 rounded-md font-bold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}