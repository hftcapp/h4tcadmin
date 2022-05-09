import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';

import Addsuggestion from '../components/Suggestions/Addsuggestion';
import Suggestionstable from '../components/Suggestions/Suggestionstable';
import customers from 'src/__mocks__/customers';
import { getAllSuggestions } from '../Connection/Suggestions';
import Paper from '@mui/material/Paper';

const Suggestions = () => {
  const [allSuggestions, setAllSuggestions] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchAllSuggestions = async () => {
      let res = await getAllSuggestions();
      console.log(res);
      if (res.data.success == true) {
        let suggestionsStruct = {};
        res.data.suggestions.map(suggestion => {
          suggestionsStruct = {
            ...suggestionsStruct,
            [suggestion.name]: suggestion.suggestions
          };
        });
        setAllSuggestions(suggestionsStruct);
      }
    };
    fetchAllSuggestions();
    setUpdate(false);
  }, [update === true]);

  return (
    <>
      <Helmet>
        <title>Suggestions | H4TC</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Paper className="p-3 text-center" style={{ height: 'auto' }}>
            <div className="text-right d-flex justify-content-between">
              <h5>Suggestions for Hair Journal writting</h5>
              <Addsuggestion handleUpdate={handleUpdate} name="Hairjournal" />
            </div>
            <br />
            {console.log(allSuggestions)}
            {allSuggestions && allSuggestions.Hairjournal && (
              <Suggestionstable
                handleUpdate={handleUpdate}
                suggestions={allSuggestions.Hairjournal}
                name="Hairjournal"
              />
            )}
          </Paper>
        </Container>
        <br />
        <br />
        <Container maxWidth={false}>
          <Paper className="p-3 text-center" style={{ height: 'auto' }}>
            <div className="text-right d-flex justify-content-between">
              <h5>Suggestions for Product Use</h5>
              <Addsuggestion handleUpdate={handleUpdate} name="Productuse" />
            </div>
            <br />
            {console.log(allSuggestions)}
            {allSuggestions && allSuggestions?.Productuse && (
              <Suggestionstable
                handleUpdate={handleUpdate}
                suggestions={allSuggestions.Productuse}
                name="Productuse"
              />
            )}
          </Paper>
        </Container>
        <br />
        <br />
        <Container maxWidth={false}>
          <Paper className="p-3 text-center" style={{ height: 'auto' }}>
            <div className="text-right d-flex justify-content-between">
              <h5>Suggestions for Protective Styles</h5>
              <Addsuggestion
                handleUpdate={handleUpdate}
                name="Protectivestyle"
              />
            </div>
            <br />
            {console.log(allSuggestions)}
            {allSuggestions && allSuggestions?.Protectivestyle && (
              <Suggestionstable
                handleUpdate={handleUpdate}
                suggestions={allSuggestions.Protectivestyle}
                name="Protectivestyle"
              />
            )}
          </Paper>
        </Container>
        <br />
        <br />
        <Container maxWidth={false}>
          <Paper className="p-3 text-center" style={{ height: 'auto' }}>
            <div className="text-right d-flex justify-content-between">
              <h5>Suggestions for Hair Salons Visit</h5>
              <Addsuggestion
                handleUpdate={handleUpdate}
                name="Hairsalonvisit"
              />
            </div>
            <br />
            {console.log(allSuggestions)}
            {allSuggestions && allSuggestions?.Hairsalonvisit && (
              <Suggestionstable
                handleUpdate={handleUpdate}
                suggestions={allSuggestions.Hairsalonvisit}
                name="Hairsalonvisit"
              />
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Suggestions;
