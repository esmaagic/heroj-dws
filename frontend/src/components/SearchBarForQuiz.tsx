import React from 'react';
import { Box, Button, Container, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SearchBarForQuiz = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <TextField
          label="Pretraži kvizove"
          variant="outlined"
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Kreiraj Kviz
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            href="/passed-quizzes"
          >
            Položeni Kvizovi
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchBarForQuiz;