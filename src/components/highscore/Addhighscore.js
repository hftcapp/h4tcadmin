import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/CloseIcon';
import Slide from '@mui/material/Slide';
import Productsselect from './Productsselect';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { addList } from '../../Connection/Productscorerecom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  products,
  selectedProductsIds,
  handleUpdate
}) {
  const [open, setOpen] = React.useState(false);
  const [listData, setListData] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = data => {
    console.log(data);
    setListData(data);
  };

  const handleSave = async () => {
    handleClose();
    let res = await addList({ name: 3, products: listData });
    console.log(res);
    if (res.data.success) {
      toast.success('Product List Updated', {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error('Product List Failed', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div>
      <button
        className="btn btn-success mx-2"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <i class="far fa-hand-pointer"></i> Choose high Score Products
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: '#99CE85' }}
          sx={{ position: 'relative' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <i class="fas fa-times"></i>
              {/* <CloseIcon /> */}
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Choose Products
            </Typography>
            <Button onClick={handleSave} autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Productsselect
            selectedProductsIds={selectedProductsIds}
            className="mt-4"
            products={products}
            handleSubmit={handleSubmit}
          />
        </Container>
      </Dialog>
    </div>
  );
}
