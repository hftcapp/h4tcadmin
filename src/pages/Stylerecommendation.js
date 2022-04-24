import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
// import Selectdialog from '../components/productrecommendation/Addproductrecomm';
import StyleListResults from '../components/stylerecommendation/StyleListResults';
import Addstyle from '../components/stylerecommendation/Addstyle';
import { getStyles } from '../Connection/Style';
import { ToastContainer, toast } from 'react-toastify';

const Selectrecommendation = () => {
  const [styles, setStyles] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchStyles = async () => {
      let res = await getStyles();
      console.log(res);
      if (res.data.success) {
        setStyles(res.data.styles);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };
    fetchStyles();
    setUpdate(false);
  }, [update === true]);
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Styles Recommendations</h3>
          <div className="text-right">
            {/* <Selectdialog customers={customers} /> */}
            <Addstyle handleUpdate={handleUpdate} />
          </div>
          <br />
          {styles && (
            <StyleListResults handleUpdate={handleUpdate} styles={styles} />
          )}
        </Container>
      </div>
    </div>
  );
};
export default Selectrecommendation;
