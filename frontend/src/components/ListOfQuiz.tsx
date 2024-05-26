'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'


// Testni podaci za prikazivanje vise kvizova. Sluzi za testiranje button-a "LOAD MORE"
const mockQuizzes = [
  { id: 1, title: 'Quiz 1', description: 'Description of Quiz 1' },
];

// Definisemo tip "Quiz" u kojem definisemo tipove za svaki atribut kviza.
type Quiz = {
  quiz_id: string;
  owner_id: string;
  title: string;
};

const ListOfQuiz = () => {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // Iz baze dobavljamo listu kvizova koje zelimo da prikazemo na stranici.
  useEffect(() => {
    async function getAllQuizzesFromDatabase() {
      try {
        const response = await axios.get('http://localhost:8000/quizzes/');
        setQuizzes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Greška prilikom dobavljanja kvizova:', error);
      }
    }

    getAllQuizzesFromDatabase();
  }, []);

  const [visibleQuizzes, setVisibleQuizzes] = useState(8);

  const loadMore = () => {
    setVisibleQuizzes((prev) => prev + 8);
  };

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {quizzes.slice(0, visibleQuizzes).map((quiz, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>

            <Card onClick={() => handleQuizClick(quiz.quiz_id)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">Quiz {index + 1}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {quiz.title}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: '80px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          disabled={visibleQuizzes >= mockQuizzes.length}
        >
          Load More
        </Button>
      </Box>
    </Container>
  );
};

export default ListOfQuiz;