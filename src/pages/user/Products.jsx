


import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCards";
import axiosinstance from "../../config/axiosinstance";
import { Col, Container, Row } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import SkeletonCard from "../../components/shared/SkeletonCard";

const Products = () => {
//   const [productList, setProductsList] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosinstance({
//         method: "GET",
//         url: "products/getproducts",
//       });
//       console.log("API Response:", response.data);

//       // Adjust based on what your backend sends
//       setProductsList(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

const [productList , isLoading ,error]= useFetch("products/getproducts")

  return (
    <div style={{ paddingTop: "70px" }}>
  <Container className="my-4">
    <h2 className="mb-4">Featured Products</h2>
    <Row>
      {isLoading
        ? // Show skeletons while loading
          [...Array(8)].map((_, i) => (
            <Col xs={12} sm={6} md={4} lg={4} xl={3} key={i}>
              <SkeletonCard />
            </Col>
          ))
        : // Show products after loading
          productList?.map((product) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              key={product?._id}
            >
              <ProductCard product={product} />
            </Col>
          ))}
    </Row>
  </Container>
</div>

  );
};

export default Products;






















// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCards";

// import axiosinstance from "../../config/axiosinstance";
// import { Col, Container, Row } from "react-bootstrap";

// const Products = () => {
//     const [productList , setProductsList] =useState([] )
//   const fetchProducts = async () => {
//     try {
//       const response = await axiosinstance({
//         method: "GET",
//         url: "products/getproducts",
//       });
//       console.log("response ===", response.data); // better to log .data
//       setProductsList(response?.data?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//    <>
//    <div style={{ paddingTop: "70px" }}>
//     {/* <CarouselComponent /> */}
   
//     <Container className="my-4">
//       <h2 className="mb-4">Featured -1111</h2>
//       <Row>
//         {productList?.map((product , index) => (
//           <Col xs={12} sm={6} md={4} lg={4} xl={3} key={product?._id}>
//   <ProductCard product={product} />
// </Col>

//         ))}
//       </Row>
//     </Container>
//     </div>
//    </>
//   );
// };

// export default Products;
