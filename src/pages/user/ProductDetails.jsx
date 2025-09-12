import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = params;

  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  const fetchProducts = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: `products/getbyid/${productId}`,
      });
      setProductDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  // Add to cart
  const addToCart = async () => {
    try {
      const res = await axiosinstance.post("cart/add-cart", {
        productId,
        quantity,
      });

      toast.success(res.data.message || "Product added to cart");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        toast.error("Please login to continue");
        // 👇 Save current path so we can return after login
        navigate("/login", { state: { from: location.pathname } });
      } else {
        toast.error(error.response?.data?.message || "Failed to add product");
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg p-3">
            <div className="row g-0 align-items-center">
              {/* Left Side - Image */}
              <div className="col-md-5">
                <img
                  src={productDetails?.image}
                  alt={productDetails?.name}
                  className="img-fluid rounded"
                />
              </div>

              {/* Right Side - Details */}
              <div className="col-md-7">
                <div className="card-body">
                  <h3 className="card-title fw-bold">{productDetails?.name}</h3>
                  <p className="card-text text-muted">
                    {productDetails?.description}
                  </p>
                  <h4 className="text-success fw-bold">
                    ₹{productDetails?.price}
                  </h4>
                  <p className="mb-1">
                    <strong>Rating:</strong> ⭐ {productDetails?.rating}
                  </p>
                  <p>
                    <strong>Reviews:</strong> {productDetails?.reviews}
                  </p>

                  {/* Quantity input */}
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <label className="fw-bold">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-control w-25"
                    />
                  </div>

                  <button
                    onClick={addToCart}
                    className="btn btn-success mt-3"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
