import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import QuestionsDisplay from "../components/QuestionsDisplay";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(15); // 5 minutes
  const [score, setScore] = useState(null); // null indicates the test is ongoing

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(savedQuestions);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        handleSubmit({}); // Automatically submit with no answers when time is up
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (answers) => {
    let calculatedScore = 0;

    // Calculate the score based on the answers
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore); // Set the score to indicate the test is over
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quiz
      </Typography>
      {score === null ? ( // Check if the test is ongoing
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Time Left: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </Typography>
          <QuestionsDisplay questions={questions} onSubmit={handleSubmit} />
        </>
      ) : (
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Your test is over! Your score is: {score}/{questions.length}
        </Typography>
      )}
    </Container>
  );
};

export default Quiz;
