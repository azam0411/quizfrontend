import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const QuestionsDisplay = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    onSubmit(answers); // Pass the answers to the parent component's submit handler
  };

  return (
    <Box sx={{ p: 4 }}>
      {questions.map((question, index) => (
        <Box key={question.id} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Question {index + 1}: {question.text}
          </Typography>
          <FormControl>
            <RadioGroup
              name={`question-${question.id}`}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              {question.options.map((option, optIndex) => (
                <FormControlLabel
                  key={optIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Answers
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionsDisplay;
