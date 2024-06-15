import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import slide1Image from './slide1.jpg';
import slide2Image from '../assets/slide2.jpg';
import slide3Image from '../assets/slide3.jpg';

function Carousel({ onFilterBooks }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 4000,  // Set autoplay speed to 3 seconds
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const images = [
    { id: 1, src: slide1Image, text: 'Explore All Books', action: 'all' },
    { id: 2, src: slide2Image, text: 'Books Starting from $199', action: '199' },
    { id: 3, src: slide3Image, text: 'Books Starting from $399', action: '399' }
  ];

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow next" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow prev" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  }

  const handleButtonClick = (action) => {
    onFilterBooks(action);
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map(image => (
          <div key={image.id} className="carousel-slide">
            <img src={image.src} alt={image.text} />
            <div className="slide-content">
              <h2>{image.text}</h2>
              <button className="explore-button" onClick={() => handleButtonClick(image.action)}>
                {image.action === 'all' ? 'Explore' : 'View'} 
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
