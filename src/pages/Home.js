import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import FileUpload from "../components/FileUpload";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionsFetched = (fetchedQuestions) => {
    setQuestions(fetchedQuestions);
    localStorage.setItem("questions", JSON.stringify(fetchedQuestions));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Generate a Quiz from Your PDF
      </Typography>
      <FileUpload onQuestionsFetched={handleQuestionsFetched} />
      {questions.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Questions are ready! Proceed to take the quiz.
          </Typography>
          <Button variant="contained" color="primary" href="/quiz">
            Go to Quiz
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
