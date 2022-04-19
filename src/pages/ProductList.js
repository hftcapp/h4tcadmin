import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import products from 'src/__mocks__/products';
import Addproduct from '../components/product/Addproduct';
import ProductListResults from '../components/product/ProductsListResults';
import customers from 'src/__mocks__/customers';
import { getProducts } from '../Connection/Product';

const ProductList = () => {
  const [products, setProducts] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let res = await getProducts();
      console.log(res);
      setProducts(res.data.products);
    };
    fetchProducts();
    setUpdate(false);
  }, [update === true]);

  return (
    <>
      <Helmet>
        <title>Products | H4TC</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <div className="text-right">
            <Addproduct handleUpdate={handleUpdate} />
          </div>
          <br />
          {products && (
            <ProductListResults
              handleUpdate={handleUpdate}
              products={products}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
