import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import Addproductrecomm from '../components/productrecommendation/Addproductrecomm';
import ProductListResults from '../components/productrecommendation/Recommendationtable';
import { getProductRecomIds, getProducts } from '../Connection/Product';

const Productrecommendation = () => {
  const [scoreProducts, setScoreProducts] = useState();
  const [scoreProductsIds, setScoreProductsIds] = useState();
  const [allProducts, setAllProducts] = useState();
  const [update, setUpdate] = useState(false);
  const [listDocumentId, setLostDocumentId] = useState('');

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchScoreProducts = async () => {
      let res = await getProductRecomIds();
      console.log(res);
      if (res.data.success) {
        setScoreProductsIds(res.data.products?.productsIds);
        setLostDocumentId(res.data.products?._id);
        let newRes = await getProducts();
        console.log(newRes);
        if (newRes.data.success) {
          setAllProducts(newRes.data.products);
          handleFilterProducts(
            newRes.data.products,
            res.data.products?.productsIds
          );
        }
      }
    };
    fetchScoreProducts();
    setUpdate(false);
  }, [update === true]);

  const handleFilterProducts = (allProducts, scoreProducts) => {
    console.log(scoreProducts);
    if (scoreProducts) {
      let filteredData = allProducts.filter(
        product => scoreProducts?.indexOf(product._id) !== -1
      );
      console.log(filteredData);
      setScoreProducts(filteredData);
    }
  };
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Product Recommendations</h3>
          <div className="text-right">
            {allProducts && (
              <Addproductrecomm
                products={allProducts}
                handleUpdate={handleUpdate}
                selectedProductsIds={scoreProductsIds ? scoreProductsIds : []}
                listDocumentId={listDocumentId}
              />
            )}
          </div>
          <br />
          {scoreProducts && <ProductListResults products={scoreProducts} />}
        </Container>
      </div>
    </div>
  );
};
export default Productrecommendation;
