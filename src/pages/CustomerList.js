import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import { getUsers } from '../Connection/Users';

const CustomerList = () => {
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await getUsers();
      console.log(res);
      setUsers(res.data.users);
    };
    fetchUsers();
    setUpdate(false);
  }, [update === true]);
  return (
    <>
      <Helmet>
        <title>Customers | H4TC</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            {users && (
              <CustomerListResults
                handleUpdate={handleUpdate}
                customers={users}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
