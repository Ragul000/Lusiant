import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Search, Filter } from "lucide-react";
import "../../App.css";
import ProductInfo from "../Product Info/ProductInfo";

const ITEMS_PER_PAGE = 5;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products.slice(0, 50));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  const filteredProducts = products.filter((item) =>
    (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter ? item.category === categoryFilter : true)
  );


  

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Get unique categories for dropdown
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>
      
      {/* Search & Filter Section */}
      <div className="search-filter-container">
        {/* Search Bar */}
        <div className="input-wrapper">
          <Search className="input-icon" size={18} />
          <input
            type="text"
            placeholder="Search by title..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        {/* Category Filter */}
        <div className="input-wrapper">
          <Filter className="input-icon" size={18} />
          <select
            className="input-field"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-left">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100 text-left">
              <td className="px-4 py-3">{item.id}</td>
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">{item.brand}</td>
              <td className="px-4 py-3">${item.price}</td>
              <td className="px-4 py-3">{item.discountPercentage}%</td>
              <td className="px-4 py-3 flex justify-center gap-3">
                <button
                  onClick={() => setSelectedProduct(item)}
                  className="text-blue-500 hover:text-blue-700 p-2 rounded-md transition"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => console.log(`Editing ${item.id}`)}
                  className="text-yellow-500 hover:text-yellow-700 p-2 rounded-md transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => console.log(`Deleting ${item.id}`)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-md transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Product Info Modal */}
      {selectedProduct && <ProductInfo product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default Products;
