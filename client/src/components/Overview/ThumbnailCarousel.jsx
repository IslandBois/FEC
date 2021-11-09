/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { OverviewContext } from './context.js';
import DefaultImageThumbnail from './DefaultImageThumbnail.jsx';
import AppContext from '../../context.js';

const ThumbnailCarousel = () => {
  const {
    slider, setSlider, thumbnailHeight, photosLength, thumbnailsShown, setThumbnailsShown, iconHeight, iconSlider, setIconSlider, imageView,
  } = useContext(OverviewContext);
  const { currentStyle } = useContext(AppContext);
  // const [carouselType, setCarouselType] = useState('thumbnail');
  // const carouselType = imageView ? 'icon' : 'thumbnail';

  const goToPrevSlide = () => {
    if (thumbnailsShown[0] > 0) {
      setSlider(slider + thumbnailHeight);
      setIconSlider(slider + iconHeight);
      setThumbnailsShown([thumbnailsShown[0] - 1, thumbnailsShown[1] - 1]);
    }
  };

  const goToNextSlide = () => {
    if (thumbnailsShown[1] < photosLength) {
      setSlider(slider - thumbnailHeight);
      setIconSlider(iconSlider - iconHeight);
      setThumbnailsShown([thumbnailsShown[0] + 1, thumbnailsShown[1] + 1]);
    }
  };

  // useEffect(() => {
  //   imageView ? setCarouselType('icon') : setCarouselType('thumbnail');
  // }, [imageView]);

  return (
    <div className="thumbnailCarousel-container">
      <div className="thumbnailCarousel-wrapper">
        <div>
          {thumbnailsShown[0] > 0
          && (
          <button className="upArrow" onClick={goToPrevSlide} type="button">
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
          )}
          {thumbnailsShown[1] < photosLength - 1
          && (
          <button className="downArrow" onClick={goToNextSlide} type="button">
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
          )}
        </div>
        <div className="thumbnailCarousel-content-wrapper">
          <div style={{ transform: `translateY(${slider}px)` }}>
            {currentStyle?.photos?.map((thumbnail, i) => <DefaultImageThumbnail thumbnail={thumbnail} i={i} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
