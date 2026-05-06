import { useEffect, useState } from "react";
import { ProductsServices } from "../../services/ProductsServices";
import { productsDefaultValue } from "../../models/Products";

export function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [createData, setCreateData] = useState(productsDefaultValue);
  const [updateData, setUpdateData] = useState(productsDefaultValue);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await ProductsServices.get(1, 10);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const createRecord = async () => {
     const { id, ...payload } = createData;

     ProductsServices.create(payload as any)
     .then(() => {
      fetchData();
      setCreateData(productsDefaultValue);
      alert('Product Created!')
     }).catch((err) => {
      console.error('error Creating', err)
     })
    //  try {
    //     ProductsServices.create(payload as any)
    //     .then(() => {
    //         fetchData();
    //         setCreateData(productsDefaultValue);
    //         alert("Product Created Succesfull")
    //     }).catch((err) => {
    //         console.error(`Error:`, err)
    //     })
    //  } catch (err) {
    //     console.error("Error Creating:", err)
    //  } finally {
    //     console.log(payload)
    //  }
    };

  // UPDATE
  const updateRecord = async (id: number) => {
  
  try {
    await ProductsServices.update(id, updateData);
    await fetchData();

    setUpdateData(productsDefaultValue);
    alert("Product updated successfully!");
  } catch (err) {
    console.error("Update error:", err);
    alert("Failed to update product.");
  }
};

  // DELETE
  const deleteRecord = async () => {
    if (!selectedId) return;

    try {
      await ProductsServices.delete(selectedId);
      await fetchData();

      setShowDelete(false);
      setSelectedId(0);

      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      {/* LIST */}
      <div>
        {loading ? (
          <p className="text-center text-white-400">Loading...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border border-white-300 rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-white-600">{product.description}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setUpdateData(product)}
                  className="bg-white-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedId(product.id);
                    setShowDelete(true);
                  }}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white-400">
            No products found.
          </p>
        )}
      </div>

      {/* CREATE */}
      <div className="bg-slate-900 p-6 mt-6 rounded-xl">
        <h3 className="text-purple-400 font-bold mb-3">
          Create Product
        </h3>

        <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Name"
          value={createData.name}
          onChange={(e) =>
            setCreateData({ ...createData, name: e.target.value })
          }
        />

        <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Description"
          value={createData.description}
          onChange={(e) =>
            setCreateData({ ...createData, description: e.target.value })
          }
        />

       <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Category"
          value={createData.category}
          onChange={(e) =>
            setCreateData({ ...createData, category: e.target.value })
          }
        />

        <button
          onClick={createRecord}
          className="w-full bg-purple-500 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* UPDATE */}
      <div className="bg-slate-800 p-6 mt-6 rounded-xl">
        <h3 className="text-white-400 font-bold mb-3">
          Update Product
        </h3>

        <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Name"
          value={updateData.name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        />

        <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Description"
          value={updateData.description}
          onChange={(e) =>
            setUpdateData({ ...updateData, description: e.target.value })
          }
        />

        <input
          className="bg-white w-full mb-2 px-2 py-1 text-black rounded"
          placeholder="Category"
          value={updateData.category}
          onChange={(e) =>
            setUpdateData({ ...updateData, category: e.target.value })
          }
        />

        <button
          onClick={() => updateRecord(selectedId)}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Update
        </button>
      </div>

      {/* DELETE */}
      {showDelete && (
        <div className="mt-4 p-4 border rounded bg-red-100">
          <p>Are you sure you want to delete this product?</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={deleteRecord}
              className="bg-red-500 px-3 py-1 text-white rounded"
            >
              Confirm
            </button>

            <button
              onClick={() => setShowDelete(false)}
              className="bg-blue-400 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

