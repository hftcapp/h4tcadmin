import React from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import Selectdialog from '../components/productrecommendation/Selectdialog';
import StyleListResults from '../components/stylerecommendation/StyleListResults';
import Addstyle from '../components/stylerecommendation/Addstyle';

const Selectrecommendation = () => {
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Styles Recommendations</h3>
          <div className="text-right">
            {/* <Selectdialog customers={customers} /> */}
            <Addstyle />
          </div>
          <br />
          <StyleListResults customers={customers} />
        </Container>
      </div>
    </div>
  );
};
export default Selectrecommendation;
