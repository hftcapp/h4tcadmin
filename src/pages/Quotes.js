import React from 'react';
import Addquotes from '../components/quotes/Addquotes';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quotestable from '../components/quotes/Quotestable';
import customers from 'src/__mocks__/customers';

const Quotes = () => {
  return (
    <div>
      <div className="">
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Quotes</h3>
          <div className="text-right">
            <Addquotes />
          </div>
          <br />
          <Quotestable customers={customers} />
        </Container>
      </div>
    </div>
  );
};
export default Quotes;
