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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ customers }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn btn-primary mx-2"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <i class="far fa-hand-pointer"></i> Choose Mid Score Products
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Productsselect className="mt-4" customers={customers} />
        </Container>
      </Dialog>
    </div>
  );
}
