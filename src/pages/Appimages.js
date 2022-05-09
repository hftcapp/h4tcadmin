import React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Model from '../assets/model.jpg';
import Chooseimage from '../components/Chooseimage';
import { ToastContainer, toast } from 'react-toastify';
import { addAppImage, getAppImages } from '../Connection/Appimage';

const Appimages = () => {
  const [imgUrl, setImgUrl] = useState();
  const [imagesData, setImagesData] = useState({});

  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchAppImages = async () => {
      let res = await getAppImages();
      console.log(res);
      if (res.data.success) {
        let dataType = {};
        res.data.appImages.map(subData => {
          dataType = {
            ...dataType,
            [subData.name]: subData
          };
        });
        console.log(dataType);
        setImagesData(dataType);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };
    fetchAppImages();
    setUpdate(false);
  }, [update === true]);

  const handleImage = data => {
    console.log(data);
    if (data.success === true) {
      setImgUrl({ name: data.name, image: data.img[0] });
    } else {
      toast.error('Image width should be greater than 375px and Height 493px', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleUpload = async name => {
    console.log(imgUrl);
    let res = await addAppImage({ image: imgUrl.image, name: name });
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error('Image Uploading Failed', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>App Images | H4TC</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {imagesData && imagesData.model ? (
            <Paper className="p-3 text-center" style={{ height: 'auto' }}>
              <h3 className="text-center mt-3">
                Choose Image for Model of the Month
              </h3>

              <div className=" mt-3 d-flex justify-content-center">
                {' '}
                <Avatar
                  sx={{ bgcolor: '#FF914D', width: 100, height: 100 }}
                  alt="Travis Howard"
                  src={
                    imgUrl?.name === 'model'
                      ? imgUrl?.image
                      : imagesData.model?.image
                  }
                />
              </div>
              <div className="d-flex justify-content-center">
                {' '}
                <Chooseimage
                  size={{ minWidth: 375, minHeight: 493 }}
                  name="model"
                  selectedImages={handleImage}
                />
                <div>
                  <button
                    style={{ width: '136px' }}
                    className="btn btn-sm btn-success mt-2 mx-1"
                    onClick={() => handleUpload('model')}
                    disabled={imgUrl?.name === 'model' ? false : true}
                  >
                    {' '}
                    <i class="fas fa-cloud-upload-alt"></i> Upload
                  </button>
                </div>
              </div>
            </Paper>
          ) : (
            ''
          )}
          <br />
          <br />
          {imagesData && imagesData.header ? (
            <Paper className="p-3 text-center" style={{ height: 'auto' }}>
              {' '}
              <h3 className="text-center mt-3">
                Choose Image for Main Header Front
              </h3>
              <div className=" mt-3 d-flex justify-content-center">
                {' '}
                <Avatar
                  sx={{ bgcolor: '#FF914D', width: 100, height: 100 }}
                  alt="Travis Howard"
                  src={
                    imgUrl?.name === 'header'
                      ? imgUrl?.image
                      : imagesData.header?.image
                  }
                />
              </div>
              <div className="d-flex justify-content-center">
                {' '}
                <Chooseimage
                  size={{ minWidth: 375, minHeight: 278 }}
                  name="header"
                  selectedImages={handleImage}
                />
                <div>
                  {console.log(imgUrl)}
                  <button
                    style={{ width: '136px' }}
                    className="btn btn-sm btn-success mt-2 mx-1"
                    onClick={() => handleUpload('header')}
                    disabled={imgUrl?.name === 'header' ? false : true}
                  >
                    {' '}
                    <i class="fas fa-cloud-upload-alt"></i> Upload
                  </button>
                </div>
              </div>
            </Paper>
          ) : (
            ''
          )}
        </Container>
      </Box>
    </>
  );
};

export default Appimages;
