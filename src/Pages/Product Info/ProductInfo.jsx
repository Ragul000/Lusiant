
import "./Productinfo.css"; // Or adjust the path based on your file structure

const ProductInfo = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="modal-overlay">
  <div className="modal-container">
    <h2>{product.title}</h2>
    <p><strong>Category:</strong> {product.category}</p>
    <p><strong>Brand:</strong> {product.brand}</p>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Discount:</strong> {product.discountPercentage}%</p>
    <img src={product.thumbnail} alt={product.title} />
    <button className="modal-close-btn" onClick={onClose}>
      Close
    </button>
  </div>
</div>

      
    );
}

export default ProductInfo