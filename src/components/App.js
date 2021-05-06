import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Search from "./Search.js";
import Nominations from "./Nominations.js";
import styled from "styled-components";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=bd902656&"; // you should replace this with yours

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=bd902656&`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const ErrorMessage = styled.div`
    margin: auto;
    font-weight: bold;
    color: rgb(161, 15, 15);
  `;

  const AppWrapper = styled.div`
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
  `;

  const MoviesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `;

  const NomWrapper = styled.div`
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `;

  return (
    <AppWrapper>
      <Header text="The Shoppies 2021" />
      <NomWrapper></NomWrapper>
      <Search search={search} />
      <MoviesWrapper>
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </MoviesWrapper>
    </AppWrapper>
  );
};

export default App;
