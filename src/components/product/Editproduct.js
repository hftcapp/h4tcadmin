import * as React from 'react';
import { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { editProduct, getProductImages } from '../../Connection/Product';
import { ToastContainer, toast } from 'react-toastify';

export default function Editproduct({ handleUpdate, data, open, handleOpen }) {
  const [values, setValues] = React.useState();
  //   const [productImages, setProductImages] = React.useState();

  useEffect(() => {
    setValues(data);
    console.log(data);
  }, [data]);

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async () => {
    handleOpen();
    console.log(values);

    const res = await editProduct(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Product Updated', {
        position: toast.POSITION.TOP_RIGHT
      });

      handleUpdate();
    }
  };
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const handleSelectedImages = imgs => {
    console.log(imgs);
    setValues({ ...values, images: imgs });
  };

  //   useMemo(() => {
  //     const fetchProductImages = async () => {
  //       let res = await getProductImages({ id: data.imagesId });
  //       console.log(res);
  //       setProductImages(res.data.images);
  //     };
  //     fetchProductImages();
  //     // setUpdate(false);
  //   }, [open === true]);

  return (
    <div>
      {}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
          </Button> */}

      {values && (
        <Dialog open={open} onClose={handleOpen}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the Product to the platform later you would be able to use
              them for recommendations
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
            <Imageupload
              images={values.images}
              selectedImages={handleSelectedImages}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>Cancel</Button>
            <Button onClick={handleSubmit}>Update Product</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
