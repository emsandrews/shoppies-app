import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Search from "./Search.js";
import Loader from "./Loader.js";
import styled from "styled-components";
import Emoji from "./Emoji.js";

const MOVIE_API_URL = "https://www.omdbapi.com/";
const MOVIE_API_KEY = "bd902656&";

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightPanel = styled.div`
  min-width: 480px;
  background: linear-gradient(273.33deg, #cfece1 16.8%, #7eb7a0 69.75%);
  display: flex;
  flex-direction: column;
`;

const NomWrapper = styled.div`
  align-self: flex-start;
  flex-flow: row wrap;
  display: flex;
`;

const NomTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-left: 25px;
  padding-top: 25px;
`;

const NomTitle = styled.div`
  color: #636669;
  font-size: 16px;
  padding-right: 10px;
`;

const NomBannerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  padding-left: 25px;
  padding-top: 25px;
`;

const NomBannerTitle = styled.div`
  color: #636669;
  font-size: 16px;
  padding-right: 10px;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviesWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;

const SearchTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  padding-left: 25px;
`;

const SearchTitle = styled.div`
  color: #636669;
  font-size: 16px;
  padding-right: 10px;
`;

const MovieTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  padding-left: 25px;
  padding-top: 25px;
`;

const MovieTitle = styled.div`
  color: #636669;
  font-size: 16px;
  padding-right: 10px;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 1000px;
  min-height: 1000px;
  height: 100%;
  padding-left: 25px;
  margin-top: 50px;
`;

const ErrorMessageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  padding-left: 25px;
`;

const Message = styled.div`
  color: #636669;
  padding-right: 10px;
  font-size: 15px;
  font-weight: bold;
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
        <ContentWrapper>
          <LeftPanel>
            <Header text="The Shoppies 2021" />
            <SearchTitleDiv>
              <SearchTitle>Find a Movie</SearchTitle>
              <Emoji symbol="🔎" label="search" />
            </SearchTitleDiv>
            <Search search={this.search} />
            <MovieTitleDiv>
              <MovieTitle>Movies</MovieTitle>
              <Emoji symbol="🎥" label="camera" />
            </MovieTitleDiv>
            <MoviesWrapper>
              {this.state.errorMessage !== null ? (
                <ErrorMessageContainer>
                  <ErrorMessageDiv>
                    <Message>{`Sorry, ${this.state.errorMessage} `}</Message>
                    <Emoji symbol="🍿" label="popcorn" />
                  </ErrorMessageDiv>
                </ErrorMessageContainer>
              ) : (
                this.state.movies.map((movie, index) => (
                  <Movie
                    key={`${index}-${movie.Title}`}
                    movie={movie}
                    onClick={this.handleAdd}
                    isNominated={false}
                  />
                ))
              )}
            </MoviesWrapper>
          </LeftPanel>
          <RightPanel>
            <NomTitleDiv>
              <NomTitle>Nominations</NomTitle>
              <Emoji symbol="🏆" label="trophy"></Emoji>
            </NomTitleDiv>
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
          </RightPanel>
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

export default App;
