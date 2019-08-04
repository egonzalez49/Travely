import React, { Component } from 'react';
import Slider from 'react-slick';
import MainSliderImage from './slider/MainSliderImage';
import leftArrow from '../../styles/images/left-arrow.svg';
import rightArrow from '../../styles/images/right-arrow.svg';

//interface for a regular user
export interface Location {
  _id: string;
  dateCreated: Date;
  city: string;
  country: string;
  rating: Number;
  imageUrl: string;
  description: string;
  attractions?: any;
  reviews?: any;
}

interface SliderProps {
  locations: Location[];
}

class ImageSlider extends Component<SliderProps> {
  renderImages = (): JSX.Element[] => {
    return this.props.locations.map(
      (location: Location): JSX.Element => {
        return (
          <div key={location.city}>
            <MainSliderImage location={location} />
          </div>
        );
      }
    );
  };

  render() {
    const prevArrow = <img src={leftArrow} alt="left arrow" />;
    const nextArrow = <img src={rightArrow} alt="right arrow" />;
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow,
      prevArrow
    };
    return (
      <div>
        <Slider {...settings}>{this.renderImages()}</Slider>
      </div>
    );
  }
}

export default ImageSlider;
