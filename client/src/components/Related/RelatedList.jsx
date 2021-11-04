/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import HorizontalGallery from 'react-dynamic-carousel';
import RelatedContext from './context';
import ProductCard from './ProductCard.jsx';
import Compare from './Compare.jsx';

const RelatedList = () => {
  const { relatedIds, currentProduct } = useContext(RelatedContext);
  const [showCompare, setShowCompare] = useState(false);
  const [clickedItem, setClickedItem] = useState(0);

  useEffect(() => {

  }, [relatedIds]);

  const toggleCompare = (e, data) => {
    setShowCompare(true);
    setClickedItem(e.target.id);
  };

  return (

    <div>
      <div id="productCardContainer">
        {
      relatedIds.map((id) => <div id="productCard" onClick={toggleCompare}><ProductCard key={id} id={id} /></div>)
      }
      </div>
      <RelatedContext.Provider value={{ showCompare, clickedItem, currentProduct }}>
        <div id="compareModal">
          <Compare />
        </div>
      </RelatedContext.Provider>

      <div id="productCardContainer">
        <HorizontalGallery
          tiles={
      relatedIds.map((id) => <div id="productCard"><ProductCard key={id} id={id} /></div>)
}
          elementWidth={200}
          fadeDistance={100}
          minPadding={10}
        />
      </div>
    </div>
  );
};

export default RelatedList;
