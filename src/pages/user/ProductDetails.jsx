import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../../config/axiosinstance";

const ProductDetails =()=>{
const params =useParams();
const {productId} = params
console.log("params ==" , params.productId);

const [productDetails , setProductDetails] =useState({})

 const fetchProducts = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: `products/getbyid/${productId}`,
      });
      console.log("API Response:", response.data);

      // Adjust based on what your backend sends
      setProductDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    fetchProducts();
  }, []);

return(
<>
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
                  ${productDetails?.price}
                </h4>
                <p className="mb-1">
                  <strong>Rating:</strong> ⭐ {productDetails?.rating}
                </p>
                <p>
                  <strong>Reviews:</strong> {productDetails?.reviews}
                </p>
                <button className="btn btn-success mt-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>


)
}



export default ProductDetails;