import React from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Paymentcard from '../assets/paymentcard.png';
import Paymentstable from '../components/Paymentdetails.js/Paymentstable';
import customers from 'src/__mocks__/customers';

const Paymentdetails = () => {
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <div className="text-center mt-3">
            <h3>Manage Payment Details and Transactions</h3>
          </div>
          <div className="row mt-3">
            <div style={{ position: 'relative' }} className="col-12 text-right">
              <img
                style={{
                  width: '400px',
                  height: '250px',
                  borderRadius: '12px'
                }}
                className="img-fluid shadow-sm"
                src={Paymentcard}
              />
              <button
                style={{ position: 'absolute', right: '0' }}
                className="btn btn-success mr-4 mt-2"
              >
                View Stripe Details
              </button>
            </div>
          </div>
          <br />
          {/* <Paymentstable customers={customers} /> */}
        </Container>
      </div>
    </div>
  );
};

export default Paymentdetails;
