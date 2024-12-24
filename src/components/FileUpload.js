import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Input } from "@mui/material";

const FileUpload = ({ onQuestionsFetched }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("File uploaded successfully:", response.data);
      const questions = response.data.data;
      const result = [];
      let i = 1;
      for (const ques of questions) {
        result.push({
          id: i++,
          text: ques.question,
          options: Object.values(ques.answers),
          correctAnswer: ques.answers[ques.correctAnswer],
        });
      }
      console.log("result is here", result);
      onQuestionsFetched(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Upload Your PDF
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
        disabled={!file}
      >
        Upload
      </Button>
    </Box>
  );
};

export default FileUpload;
