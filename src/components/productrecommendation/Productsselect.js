import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import Product from '../../assets/product.png';

const ProductsListResults = ({
  products,
  selectedProductsIds,
  handleSubmit,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [existingProductsIds, setExistingProductsids] = useState();

  useEffect(() => {
    setExistingProductsids(selectedProductsIds);
  }, []);

  console.log(selectedProductsIds);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = products.map(customer => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRemove = id => {
    let newData = existingProductsIds.filter(existingId => existingId !== id);
    setExistingProductsids(newData);
    handleSubmit(newData);
  };

  const handleAdd = id => {
    let newData = [...existingProductsIds, id];
    setExistingProductsids([...existingProductsIds, id]);
    handleSubmit(newData);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>

                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow
                  hover
                  key={products._id}
                  // selected={selectedproductsIds.indexOf(products.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar src={product.coverImage} sx={{ mr: 2 }}>
                        {getInitials(product.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>

                  <TableCell>
                    {console.log(existingProductsIds)}
                    {existingProductsIds?.indexOf(product._id) === -1 ? (
                      <button
                        onClick={() => handleAdd(product._id)}
                        className="btn btn-primary"
                      >
                        Select <i class="far fa-hand-pointer"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="btn btn-primary"
                      >
                        Un Select <i class="far fa-hand-pointer"></i>
                      </button>
                    )}
                  </TableCell>
                  {/* <TableCell>
                    <button className="btn btn-danger">
                      Delete <i class="far fa-trash-alt"></i>
                    </button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ProductsListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default ProductsListResults;
