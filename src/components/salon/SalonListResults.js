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
import Salon from '../../assets/salon.png';
import { getSalonImages, deleteSalon } from '../../Connection/Salon';
import Editsalon from './Editsalon';
import { ToastContainer, toast } from 'react-toastify';

const SalonListResults = ({ salons, handleUpdate, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleEdit = salon => {
    console.log(salon);
    // setEditData({
    //   ...salon,
    //   images: [salon.coverImage]
    // });
    // handleOpenEdit();

    const fetchSalonImages = async () => {
      let res = await getSalonImages({ id: salon.imagesId });
      console.log(res);
      if (res.data.success) {
        setEditData({
          ...salon,
          images: res.data.images.images
        });
        handleOpenEdit();
      }
    };
    fetchSalonImages();
  };

  const handleDelete = async (id, imagesId) => {
    const res = await deleteSalon({ id, imagesId });
    if (res.data.success) {
      toast.success('Salon Deleted', {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error('Salon Deleting Error', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = salons.map(customer => customer.id);
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
                    <TableCell>Location</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salons.map(salon => (
                    <TableRow
                      hover
                      key={salon.id}
                      // selected={selectedsalonIds.indexOf(salon.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar src={salon.coverImage} sx={{ mr: 2 }}>
                            {getInitials(salon.name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {salon.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      {/* <TableCell>{salon.email}</TableCell> */}
                      <TableCell>{salon.location.address}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleEdit(salon)}
                          className="btn btn-primary"
                        >
                          Edit <i class="far fa-edit"></i>
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            handleDelete(salon._id, salon.imagesId)
                          }
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
        <Editsalon
          handleOpen={handleOpenEdit}
          open={openEdit}
          data={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

SalonListResults.propTypes = {
  salons: PropTypes.array.isRequired
};

export default SalonListResults;
