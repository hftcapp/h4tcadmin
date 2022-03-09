import React from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import Selectdialog from '../components/productrecommendation/Selectdialog';
import SalonListResults from '../components/salon/SalonListResults';
import Addsalon from '../components/salon/Addsalon';

const Selectrecommendation = () => {
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Salon Recommendations</h3>
          <div className="text-right">
            {/* <Selectdialog customers={customers} /> */}
            <Addsalon />
          </div>
          <br />
          <SalonListResults customers={customers} />
        </Container>
      </div>
    </div>
  );
};
export default Selectrecommendation;
