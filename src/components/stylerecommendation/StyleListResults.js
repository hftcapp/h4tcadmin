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
import Styleimage from '../../assets/style.png';
import { getStyleImages, deleteStyle } from '../../Connection/Style';
import Editstyle from './Editstyle';
import { ToastContainer, toast } from 'react-toastify';

const StyleListResults = ({ styles, handleUpdate, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleEdit = style => {
    console.log(style);
    setEditData({
      ...style,
      images: [style.coverImage]
    });
    handleOpenEdit();

    const fetchStyleImages = async () => {
      let res = await getStyleImages({ id: style.imagesId });
      console.log(res);
      if (res.data.success) {
        setEditData({
          ...style,
          images: res.data.images.images
        });
        handleOpenEdit();
      }
    };
    fetchStyleImages();
  };

  const handleDelete = async (id, imagesId) => {
    const res = await deleteStyle({ id, imagesId });
    if (res.data.success) {
      toast.success('Style Deleted', {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error('Style Deleting Error', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = styles.map(customer => customer.id);
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
        {' '}
        <Card {...rest}>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {styles.map(style => (
                    <TableRow
                      hover
                      key={style.id}
                      // selected={selectedstyleIds.indexOf(style.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar src={style.coverImage} sx={{ mr: 2 }}>
                            {getInitials(style.name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {style.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{style.description}</TableCell>
                      {/* <TableCell>
                  {`${style.address.city}, ${style.address.state}, ${style.address.country}`}
                </TableCell> */}
                      <TableCell>
                        <button
                          onClick={() => handleEdit(style)}
                          className="btn btn-primary"
                        >
                          Edit <i class="far fa-edit"></i>
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            handleDelete(style._id, style.imagesId)
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
        <Editstyle
          handleOpen={handleOpenEdit}
          open={openEdit}
          data={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

StyleListResults.propTypes = {
  styles: PropTypes.array.isRequired
};

export default StyleListResults;
