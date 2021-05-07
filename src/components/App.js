import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Search from "./Search.js";
import Loader from "./Loader.js";
import styled from "styled-components";

const MOVIE_API_URL = "https://www.omdbapi.com/";
const MOVIE_API_KEY = "bd902656&";

const ErrorMessage = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #636669;
  display: flex;
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

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  padding-left: 25px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      loading: true,
      movies: [],
      errorMessage: null,
      nominations: [],
    };
  }

  componentDidMount() {
    this.search("man");
  }

  search(searchValue) {
    if (searchValue.length > 0) {
      this.setState({
        loading: true,
        errorMessage: null,
      });
      const urlString = `${MOVIE_API_URL}?s=${searchValue}&apikey=${MOVIE_API_KEY}&`;
      console.log(urlString);
      fetch(urlString)
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
  }

  handleAdd(movie) {
    const nominations = this.state.nominations;
    if (
      nominations.length < 5 &&
      nominations.find((nom) => nom.Title == movie.Title) == null
    ) {
      nominations.push(movie);
    }
    this.setState({ nominations });
  }

  handleRemove(movie) {
    const nominations = this.state.nominations;
    var filteredNominations = nominations.filter(function (nom) {
      return nom.Title != movie.Title;
    });
    this.setState({ nominations: filteredNominations });
  }

  render() {
    return (
      <AppWrapper>
        <Header text="The Shoppies 2021" />
        <NomWrapper>
          {this.state.nominations.map((movie, index) => (
            <Movie
              key={`nom-${index}-${movie.Title}`}
              movie={movie}
              onClick={this.handleRemove}
              buttonTitle={"Remove"}
              isNominated={true}
            />
          ))}
        </NomWrapper>
        <Search search={this.search} />
        <ErrorDiv>
          {this.state.errorMessage !== null ? (
            <ErrorMessage>{`Sorry, ${this.state.errorMessage}`}</ErrorMessage>
          ) : null}
        </ErrorDiv>
        <MoviesWrapper>
          {this.state.movies.map((movie, index) => (
            <Movie
              key={`${index}-${movie.Title}`}
              movie={movie}
              onClick={this.handleAdd}
              isNominated={false}
            />
          ))}
        </MoviesWrapper>
      </AppWrapper>
    );
  }
}

export default App;
