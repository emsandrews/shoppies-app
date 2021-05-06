import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Search from "./Search.js";
import Nominations from "./Nominations.js";
import styled from "styled-components";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=bd902656&"; // you should replace this with yours

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      loading: true,
      movies: [],
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.search("man");
  }

  search(searchValue) {
    this.setState({
      loading: true,
      setErrorMessage: null,
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=bd902656&`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          this.setState({
            movies: jsonResponse.Search,
            loading: false,
          });
        } else {
          this.setState({
            errorMessage: jsonResponse.Error,
            loading: false,
          });
        }
      });
  }

  render() {
    return (
      <AppWrapper>
        <Header text="The Shoppies 2021" />
        <NomWrapper></NomWrapper>
        <Search search={this.search} />
        <MoviesWrapper>
          {this.state.loading && !this.state.errorMessage ? (
            <span>loading...</span>
          ) : this.state.errorMessage ? (
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
          ) : (
            this.state.movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </MoviesWrapper>
      </AppWrapper>
    );
  }
}

export default App;
