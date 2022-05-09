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
import Editquestion from './Editquestion';
import { deleteQuestion } from '../../Connection/Monthquiz';
import { ToastContainer, toast } from 'react-toastify';

const Quiztable = ({ questions, handleUpdate, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState();

  const handleOpenEditQuestion = () => {
    setOpenEditQuestion(!openEditQuestion);
  };
  const handleEditQuestion = question => {
    console.log(question);
    setEditQuestionData({
      ...question
    });
    handleOpenEditQuestion();
  };

  const handleDelete = async id => {
    let res = await deleteQuestion({ id });
    console.log(res);
    if (res.data.success) {
      toast.success('Question Deleted', {
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
      newSelectedCustomerIds = questions.map(customer => customer.id);
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
                    <TableCell>Question</TableCell>
                    <TableCell>Options</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map(question => (
                    <TableRow
                      hover
                      key={question._id}
                      // selected={selectedQuestionIds.indexOf(question._id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          {/* <Avatar src={Product} sx={{ mr: 2 }}>
                      {getInitials(question.name)}
                    </Avatar> */}
                          <Typography color="textPrimary" variant="body1">
                            {question.question}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {question.option1} , {question.option2} ,{' '}
                        {question.option3}
                      </TableCell>
                      {/* <TableCell>
                  {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                </TableCell> */}

                      <TableCell>
                        <button
                          onClick={() => handleEditQuestion(question)}
                          className="btn btn-primary"
                        >
                          Edit <i class="far fa-edit"></i>
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(question._id)}
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
      {editQuestionData && (
        <Editquestion
          handleOpen={handleOpenEditQuestion}
          open={openEditQuestion}
          data={editQuestionData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

Quiztable.propTypes = {
  customers: PropTypes.array.isRequired
};

export default Quiztable;
