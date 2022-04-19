import React, { useState, useEffect } from 'react';
import Addquotes from '../components/quotes/Addquotes';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quotestable from '../components/quotes/Quotestable';
import customers from 'src/__mocks__/customers';
import { getQuotes } from '../Connection/Quotes';

const Quotes = () => {
  const [quotes, setQuotes] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      let res = await getQuotes();
      console.log(res);
      setQuotes(res.data.quotes);
    };
    fetchQuotes();
    setUpdate(false);
  }, [update === true]);
  return (
    <div>
      <div className="">
        <Container maxWidth={false}>
          <h3 className="text-center mt-3">Manage Quotes</h3>
          <div className="text-right">
            <Addquotes handleUpdate={handleUpdate} />
          </div>
          <br />
          {quotes && (
            <Quotestable quotes={quotes} handleUpdate={handleUpdate} />
          )}
        </Container>
      </div>
    </div>
  );
};
export default Quotes;
