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

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch product details
  const fetchProducts = async () => {
    try {
      const response = await axiosinstance.get(`products/getbyid/${productId}`);
      setProductDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch reviews + avg rating
  const fetchReviews = async () => {
    try {
      const res = await axiosinstance.get(`/reviews/get-product-reviews?productId=${productId}`);
      setReviews(res.data);

      const avgRes = await axiosinstance.get(`/reviews/get-avg-rating?productId=${productId}`);
      setAvgRating(avgRes.data.avgRating);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, [productId]);

  // Add to cart
  const addToCart = async () => {
    try {
      const res = await axiosinstance.post("cart/add-cart", { productId, quantity });
      toast.success(res.data.message || "Product added to cart");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to continue");
        navigate("/login", { state: { from: location.pathname } });
      } else {
        toast.error(error.response?.data?.message || "Failed to add product");
      }
    }
  };

  // Submit review
  const submitReview = async () => {
    if (!rating) {
      return toast.error("Please select a rating");
    }
    try {
      await axiosinstance.post("/reviews/add-review", {
        productId,
        rating,
        comment,
      });
      toast.success("Review submitted");
      setRating(0);
      setComment("");
      fetchReviews(); // refresh reviews
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
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
                  <p className="card-text text-muted">{productDetails?.description}</p>
                  <h4 className="text-success fw-bold">₹{productDetails?.price}</h4>

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

                  <button onClick={addToCart} className="btn btn-success mt-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Reviews Section ---------------- */}
      <hr />
      <h4>Customer Reviews</h4>
      <p>
        ⭐ {avgRating.toFixed(1)} / 5 ({reviews.length} reviews)
      </p>

      {/* Review Form */}
      <div className="mb-4">
        <h5>Write a Review</h5>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="form-select w-25"
        >
          <option value="">Select Rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          className="form-control mt-2"
        />
        <button className="btn btn-primary mt-2" onClick={submitReview}>
          Submit
        </button>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-2 mb-2">
            <strong>{r.userId?.name}</strong> ⭐ {r.rating}
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductDetails;
