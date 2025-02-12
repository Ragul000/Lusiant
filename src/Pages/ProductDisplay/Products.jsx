import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "../../App.css";
import ProductInfo from "../Product Info/ProductInfo";


const ITEMS_PER_PAGE = 5;

const Products = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    useEffect(() => {
      axios.get("https://dummyjson.com/products")
        .then(response => {
          setProducts(response.data.products.slice(0, 50));
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []); // ✅ Fixed: Runs only once
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginatedData = products.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  
    return (
      <div className="p-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>${item.price}</td>
                <td>{item.discountPercentage}%</td>
                <td>
                <button onClick={() => setSelectedProduct(item)} className="text-blue-500 hover:text-blue-700">
                  <Eye size={18} />
                </button>
                  <button onClick={() => console.log(`Editing ${item.id}`)}><Pencil size={18} /></button>
                  <button onClick={() => console.log(`Deleting ${item.id}`)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
            Next
          </button>
        </div>
        {selectedProduct && (
        <ProductInfo product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      </div>
    );
}

export default Products