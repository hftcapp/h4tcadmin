import React from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import Selectdialog from '../components/productrecommendation/Selectdialog';
import ProductListResults from '../components/product/ProductsListResults';

const Productrecommendation = () => {
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Product Recommendations</h3>
          <div className="text-right">
            <Selectdialog customers={customers} />
          </div>
          <br />
          <ProductListResults customers={customers} />
        </Container>
      </div>
    </div>
  );
};
export default Productrecommendation;
