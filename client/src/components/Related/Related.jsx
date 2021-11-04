import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../context';
import RelatedContext from './context';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Related = () => {
  const currentProduct = useContext(AppContext);
  const [relatedIds, setRelatedID] = useState([]);
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    if (currentProduct.currentProduct.length === 0) { return; }
    const relatedItems = () => {
      const productId = currentProduct.currentProduct.id;
      if (currentProduct.currentProduct !== undefined) {
        axios.get(`/products/${productId}/related`)
          .then((res) => {
            setRelatedID(res.data);
          });
      }
    };
    relatedItems();
  }, [currentProduct]);

  const addOutfitClick = () => {
    setOutfit(currentProduct);
  };

  return (
    <div id="widget">
      <div>
        <RelatedContext.Provider value={{ relatedIds, currentProduct, outfit }}>
          <div id="relatedProductsContainer">
            <RelatedList />
          </div>
          <div id="outfitContainer">
            <div id="addOutfit">
              <div id="addButton" onClick={addOutfitClick}>
                <br />
                +
                <br />
                <br />
                Add Outfit
              </div>
            </div>
            <OutfitList />
          </div>
        </RelatedContext.Provider>
      </div>
    </div>
  );
};
export default Related;
