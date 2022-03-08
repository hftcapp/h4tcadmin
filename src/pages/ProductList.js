import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import products from 'src/__mocks__/products';
import Addproduct from '../components/product/Addproduct';
import ProductListResults from '../components/product/ProductsListResults';
import customers from 'src/__mocks__/customers';

const ProductList = () => (
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
          <Addproduct />
        </div>
        <br />
        <ProductListResults customers={customers} />
      </Container>
    </Box>
  </>
);

export default ProductList;
