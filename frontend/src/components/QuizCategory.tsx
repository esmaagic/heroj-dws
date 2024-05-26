
import { Box, Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Ostalo', 'Category 1'];
type Category = {
  category_id: number;
  category_title: string;
};

const QuizCategory = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  // Iz baze dobavljamo listu kategorija koje zelimo da prikazemo na stranici.
  useEffect(() => {
    async function getAllQuizCategoriesFromDatabase() {
      try {
        const response = await axios.get('http://localhost:8000/quiz/categories');
        setCategories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Greška prilikom dobavljanja kategorija kvizova:', error);
      }
    }

    getAllQuizCategoriesFromDatabase();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={index}>
              <Button variant="contained">{category.category_title}</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};


export default QuizCategory;