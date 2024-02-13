import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
} from "@mui/material";

const CreateRecordPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [score, setScore] = useState("");
  const [createDate,setCreateDate] = useState(new Date());
  const [message, setMessage] = useState("");

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
        await axios.post("http://localhost:8080/api/records", {
            name,
            surname,
            score,
            formattedDate: createDate.toISOString(),
            
        });
        console.log(formattedDate);
        setMessage("Record created successfully!");
        setName("");
        setSurname("");
        setScore("");
        setCreateDate(new Date());
    } catch (error) {
        console.error("Error creating record:", error);
        setMessage("Error creating record. Please try again.");
    }
};

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Create Score Record
      </Typography>
      <form onSubmit={handleSubmit}>
        {message && (
          <Typography variant="body1" color="textSecondary" align="center">
            {message}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Surname"
              variant="outlined"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Score"
              variant="outlined"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button style={{background:'teal'}}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => navigate(-1)}
        style={{ marginTop: "1rem" }}
      >
        Back to List
      </Button>
    </Container>
  );
};

export default CreateRecordPage;