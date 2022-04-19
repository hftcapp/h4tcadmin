import { useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';

const Highscoretable = ({ products, handleUpdate, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  //   const handleDelete = async (id, imagesId) => {
  //     const res = await deleteProduct({ id, imagesId });
  //     if (res.data.success) {
  //       toast.success('Product Deleted', {
  //         position: toast.POSITION.TOP_RIGHT
  //       });
  //       handleUpdate();
  //     } else {
  //       toast.error('Product Deleting Error', {
  //         position: toast.POSITION.TOP_RIGHT
  //       });
  //     }
  //   };

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

  return (
    <div>
      <div>
        <Card {...rest}>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>

                    {/* <TableCell>Edit</TableCell> */}
                    {/* <TableCell>Delete</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => (
                    <TableRow
                      hover
                      key={product.id}
                      // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
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

                      {/* <TableCell>
                        <button
                          //   onClick={() =>
                          //     handleDelete(product._id, product.imagesId)
                          //   }
                          className="btn btn-danger"
                        >
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
      </div>
    </div>
  );
};

Highscoretable.propTypes = {
  products: PropTypes.array.isRequired
};

export default Highscoretable;
