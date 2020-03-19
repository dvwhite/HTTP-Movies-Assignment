import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";

// Styled components
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  margin: 1%;
  opacity: 0.95;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  background: whitesmoke;
  width: 70%;
  height: auto;
  overflow: hidden;
  word-wrap: break-word;
  overflow: hidden;
  transition: all 0.2s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
    transition: all 0.3s ease;
    box-shadow: 4px 4px 8px #444;
    & > div > svg {
      transition: all 0.3s ease;
      stroke: #444;
      path {
        fill: #444;
      }
    }
  }
`;

// The input elements on the form
const Input = styled.input`
  margin: 1%;
  padding: 2%:
  width: 40%;
  border-radius: 5px;
  border: 1px solid gray;
  outline: 0;
  align-self: center;
  @media (max-width: 1400px) {
    width: 55%;
  }
  @media (max-width: 1200px) {
    width: 60%;
  }
  @media (max-width: 1000px) {
    width: 65%;
  }
  &:focus {
    border: 1px solid dodgerblue;
    box-shadow: 2px 2px 4px dodgerblue;
  }
  &:last-of-type {
    margin-bottom: 5%;
  }
`;

const EditMovieForm = ({ getMovieList, setMovieList }) => {
  const match = useRouteMatch();
  const initialState = { title: "", director: "", metascore: "", stars: [] };
  const [input, setInput] = useState(initialState);
  const [id, setId] = useState(0);
  const history = useHistory();

  // Get the id to update from the route
  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  // Edit movie function
  const updateMovie = movie => {
    // First, ask the API to update this movie and send back the updated movie object
    axios
      .put(`http://localhost:5000/api/movies/${id}`, { ...movie, id: id })
      .then(singleMovieRes => {
        // Work around the back-end not returning all movies on update
        // Send another call to get all tickets in the API, then
        // Replace existing ticket with this newly updated one
        axios
          .get("http://localhost:5000/api/movies")
          .then(allMoviesRes => {
            setMovieList([...allMoviesRes.data.filter(item => item.id !== movie.id), singleMovieRes.data]);
            history.push(`/movies/${id}`);
          })
          .catch(err => console.log(err.response));
      });
  };
  
  const handleChange = e => {
    e.preventDefault();
    const val =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setInput({ ...input, [e.target.name]: val });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateMovie(input);
    setInput(initialState);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <h3>Edit the Movie</h3>
        <Input
          type="string"
          name="title"
          value={input.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <Input
          type="string"
          name="director"
          placeholder="Director"
          value={input.director}
          onChange={handleChange}
        />
        <Input
          type="string"
          name="metascore"
          value={input.metascore}
          placeholder="Metascore"
          onChange={handleChange}
        />
        <Input
          type="string"
          name="stars"
          value={input.stars}
          placeholder="Enter a comma-separated list of actors"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </Form>
    </FormWrapper>
  );
};

export default EditMovieForm;
