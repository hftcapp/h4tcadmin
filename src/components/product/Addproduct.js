import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { addProduct } from '../../Connection/Product';
import { ToastContainer, toast } from 'react-toastify';

export default function Addproduct({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    ingredients: ''
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async () => {
    handleClose();

    const res = await addProduct(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Product Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        ingredients: ''
      });
      handleUpdate();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImages = imgs => {
    console.log(imgs);
    setValues({ ...values, images: imgs });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button className="btn btn-success " onClick={handleClickOpen}>
        Add Product
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Product to the platform later you would be able to use them
            for recommendations
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Price"
            type="number"
            fullWidth
            variant="standard"
            value={values.price}
            onChange={handleChange}
            name="price"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Quantity"
            type="number"
            fullWidth
            variant="standard"
            value={values.quantity}
            onChange={handleChange}
            name="quantity"
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={values.description}
            onChange={handleChange}
            name="description"
          />
          <br />
          <TextField
            id="standard-multiline-static"
            label="Ingredients"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={values.ingredients}
            onChange={handleChange}
            name="ingredients"
          />
          <br />
          <br />
          <Imageupload selectedImages={handleSelectedImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Product</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
