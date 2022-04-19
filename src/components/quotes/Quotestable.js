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
import Editquote from './Editquote';
import { ToastContainer, toast } from 'react-toastify';

import { deleteQuote } from '../../Connection/Quotes';

const Quotestable = ({ quotes, handleUpdate, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleEdit = quote => {
    console.log(quote);
    setEditData({
      ...quote
    });
    handleOpenEdit();
  };

  const handleDelete = async id => {
    let res = await deleteQuote({ id });
    console.log(res);
    if (res.data.success) {
      toast.success('Quote Deleted', {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error(res.json.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = quotes.map(customer => customer.id);
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
                    <TableCell>Quote</TableCell>
                    <TableCell>Number of Day</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotes.map(quote => (
                    <TableRow
                      hover
                      key={quote.id}
                      // selected={selectedquoteIds.indexOf(quote.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          {/* <Avatar src={Product} sx={{ mr: 2 }}>
                      {getInitials(quote.name)}
                    </Avatar> */}
                          <Typography color="textPrimary" variant="body1">
                            {quote.quote}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{quote.number}</TableCell>
                      {/* <TableCell>
                  {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                </TableCell> */}

                      <TableCell>
                        <button
                          onClick={() => handleEdit(quote)}
                          className="btn btn-primary"
                        >
                          Edit <i class="far fa-edit"></i>
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(quote._id)}
                          className="btn btn-danger"
                        >
                          Delete <i class="far fa-trash-alt"></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </div>
      {editData && (
        <Editquote
          handleOpen={handleOpenEdit}
          open={openEdit}
          data={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

Quotestable.propTypes = {
  customers: PropTypes.array.isRequired
};

export default Quotestable;
