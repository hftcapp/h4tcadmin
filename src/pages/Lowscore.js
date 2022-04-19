import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import products from 'src/__mocks__/products';
import Addproduct from '../components/product/Addproduct';
import ProductListResults from '../components/product/ProductsListResults';
import customers from 'src/__mocks__/customers';
import { getScoreProducts } from '../Connection/Productscorerecom';
import Highscoretable from '../components/highscore/highscoretable';
import Addlowscore from '../components/lowscore/Addlowscore';
import { getProducts } from '../Connection/Product';

const ProductList = () => {
  const [scoreProducts, setScoreProducts] = useState();
  const [scoreProductsIds, setScoreProductsIds] = useState();
  const [allProducts, setAllProducts] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchScoreProducts = async () => {
      let res = await getScoreProducts({ name: 1 });
      console.log(res);
      if (res.data.success) {
        setScoreProductsIds(res.data.products?.products);
        let newRes = await getProducts();
        if (newRes.data.success) {
          setAllProducts(newRes.data.products);
          handleFilterProducts(
            newRes.data.products,
            res.data.products.products
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
    <>
      <Helmet>
        <title>High Score Products | H4TC</title>
      </Helmet>
      {console.log(scoreProductsIds)}
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <div className="text-right">
            {/* <Addproduct handleUpdate={handleUpdate} /> */}
            {allProducts && (
              <Addlowscore
                products={allProducts}
                handleUpdate={handleUpdate}
                selectedProductsIds={scoreProductsIds ? scoreProductsIds : []}
              />
            )}
          </div>
          <br />
          {scoreProducts && (
            <Highscoretable
              handleUpdate={handleUpdate}
              products={scoreProducts}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
