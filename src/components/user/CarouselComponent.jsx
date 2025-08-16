import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = () => {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img style={{ height: '500px', objectFit: 'contain' }}
          className="d-block w-100"
          src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Big Sale!</h3>
          <p>Up to 50% off on selected items.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img style={{ height: '500px', objectFit: 'cover' }}
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>New Arrivals</h3>
          <p>Fresh styles for the new season.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img style={{ height: '500px', objectFit: 'cover' }}
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Shop Now</h3>
          <p>Discover our latest products.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
