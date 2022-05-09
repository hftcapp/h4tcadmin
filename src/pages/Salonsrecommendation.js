import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
// import Selectdialog from '../components/productrecommendation/Addproductrecomm';
import SalonListResults from '../components/salon/SalonListResults';
import Addsalon from '../components/salon/Addsalon';
import { getSalons } from '../Connection/Salon';
import { ToastContainer, toast } from 'react-toastify';
import Maps from '../components/Maps';

const Selectrecommendation = () => {
  const [salons, setSalons] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchSalons = async () => {
      let res = await getSalons();
      console.log(res);
      if (res.data.success) {
        setSalons(res.data.salons);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };
    fetchSalons();
    setUpdate(false);
  }, [update === true]);
  return (
    <div>
      <div>
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Salon Recommendations</h3>
          <div className="text-right">
            {/* <Selectdialog customers={customers} /> */}
            <Addsalon handleUpdate={handleUpdate} />
          </div>
          <br />
          {salons && (
            <SalonListResults handleUpdate={handleUpdate} salons={salons} />
          )}
        </Container>
      </div>
    </div>
  );
};
export default Selectrecommendation;
