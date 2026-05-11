import { useEffect, useState } from "react";
import { ProductsServices } from "../../services/ProductsServices";
import { productsDefaultValue, type ProductsViewModel,} from "../../models/Products";
import { ItemBox } from "../../components/cards/ItemBox";
import { FormsContainer } from "../../components/forms/FormsContainer";
import { FormsButton } from "../../components/forms/FormsButton";

export function Products() {
  const [products, setProducts] = useState<ProductsViewModel[]>([]);

  const [createData, setCreateData] =
    useState<ProductsViewModel>(productsDefaultValue);

  const [updateData, setUpdateData] =
    useState<ProductsViewModel>(productsDefaultValue);

  const [selectedId, setSelectedId] =
    useState<number>(0);

  const [showDelete, setShowDelete] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await ProductsServices.get(1, 10);

      setProducts(res.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE PRODUCT
  const createProduct = async () => {
    try {
      const { id, ...payload } = createData;

      await ProductsServices.create(payload as any);

      await fetchProducts();

      setCreateData(productsDefaultValue);

      alert("Product Created!");
    } catch (error) {
      console.error("Create Error:", error);

      alert("Failed to create product.");
    }
  };

  // SELECT PRODUCT
  const handleSelectProduct = (
    product: ProductsViewModel
  ) => {
    setUpdateData(product);
    setSelectedId(product.id);
  };

  // DATE PRODUCT
  const updateProduct = async () => {
    if (!selectedId) return;

    try {
      await ProductsServices.update(
        selectedId,
        updateData
      );

      await fetchProducts();

      setUpdateData(productsDefaultValue);

      setSelectedId(0);

      alert("Product Updated!");
    } catch (error) {
      console.error("Update Error:", error);

      alert("Failed to update product.");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async () => {
    if (!selectedId) return;

    try {
      await ProductsServices.delete(selectedId);

      await fetchProducts();

      setShowDelete(false);

      setSelectedId(0);

      alert("Product Deleted!");
    } catch (error) {
      console.error("Delete Error:", error);

      alert("Failed to delete product.");
    }
  };

  const handleCreateChange = (
    key: keyof ProductsViewModel,
    value: string
  ) => {
    setCreateData({
      ...createData,
      [key]: value,
    });
  };

  const handleUpdateChange = (
    key: keyof ProductsViewModel,
    value: string
  ) => {
    setUpdateData({
      ...updateData,
      [key]: value,
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* ================= PRODUCT LIST */}
      {loading ? (
        <p className="text-white">
          Loading...
        </p>
      ) : products.length > 0 ? (
          products.map((product) => (
            <ItemBox
              key={product.id}
              onClick={() =>
                handleSelectProduct(product)
              }
              onDelete={() => {
                setSelectedId(product.id);
                setShowDelete(true);
              }}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  {product.name}
                </h3>

                <p className="text-white">
                  {product.description}
                </p>

                <p className="text-sm text-gray-300">
                  {product.category}
                </p>
              </div>
            </ItemBox>
          ))
      ) : (
        <p className="text-center text-white">
          No products found.
        </p>
      )}
    </div>

      {/* FORMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CREATE FORM */}
        <FormsContainer
          type="CreateData"
          title="Create Product"
        >
          <div className="space-y-3">
            <input
              className="bg-white w-full px-3 py-2 rounded text-black"
              placeholder="Name"
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

            <input
              className="bg-white w-full px-3 py-2 rounded text-black"
              placeholder="Category"
              value={createData.category}
              onChange={(e) =>
                handleCreateChange(
                  "category",
                  e.target.value
                )
              }
            />

            <FormsButton
              type="Create"
              onClick={createProduct}
            >
              Save Product
            </FormsButton>
          </div>
        </FormsContainer>

        {/* UPDATE FORM */}
        <FormsContainer
          type="UpdateData"
          title={`Update Product: ${updateData.name}`}
        >
          <div className="space-y-3">
            <input
              className="bg-white w-full px-3 py-2 rounded text-black"
              placeholder="Name"
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

            <input
              className="bg-white w-full px-3 py-2 rounded text-black"
              placeholder="Category"
              value={updateData.category}
              onChange={(e) =>
                handleUpdateChange(
                  "category",
                  e.target.value
                )
              }
            />

            <FormsButton
              type="Update"
              onClick={updateProduct}
            >
              Update Product
            </FormsButton>
          </div>
        </FormsContainer>
      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-slate-900 p-6 rounded-lg border border-red-500 max-w-sm w-full space-y-4">
            <div className="text-center">
              Are you sure you want to delete
              this product?
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  setShowDelete(false)
                }
                className="px-4 py-1"
              >
                Cancel
              </button>

              <button
                onClick={deleteProduct}
                className="bg-red-500 px-6 py-1 rounded-md font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    
    </>
  );
}