// src/components/SkeletonCard.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="card shadow-sm p-2 mb-4">
      <Skeleton height={200} className="card-img-top" />

      <div className="card-body">
        <h5 className="card-title">
          <Skeleton width={150} />
        </h5>
        <p className="card-text">
          <Skeleton count={2} />
        </p>
        <h6>
          <Skeleton width={80} />
        </h6>
        <Skeleton width={100} height={35} />
      </div>
    </div>
  );
};

export default SkeletonCard;
