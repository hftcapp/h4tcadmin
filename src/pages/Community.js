import React from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Form from '../components/community/Form';

const Community = () => {
  return (
    <div>
      <div>
        <Container className="text-center" maxWidth={false}>
          <div>
            <h3 className="text-center mt-3">
              Set Api Keys of your Facebook account
            </h3>
          </div>
          {/* <Form /> */}
        </Container>
      </div>
    </div>
  );
};

export default Community;
