import React from "react";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Search from "./Search.js";
import styled from "styled-components";
import Emoji from "./Emoji.js";

const MOVIE_API_URL = "https://www.omdbapi.com/";

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const RightPanel = styled.div`
  min-width: 480px;
  width: 480px;
  background: linear-gradient(273.33deg, #cfece1 16.8%, #7eb7a0 69.75%);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 300px;
    min-width: 100%;
    width: auto;
    height: auto;
  }
`;

const NomWrapper = styled.div`
  align-self: flex-start;
  flex-flow: row wrap;
  display: flex;
`;

const NomTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 25px;
`;

const NomTitle = styled.div`
  color: #fff;
  font-size: 30px;
  padding: 15px;
`;

const NomBanner = styled.div`
  color: #636669;
  font-size: 16px;
  padding: 15px;
  background-color: white;
  height: 30px;
  width: 400px;
  border-radius: 10px;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MoviesWrapper = styled.div`
  display: flex;
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.movieIsNominated = this.movieIsNominated.bind(this);
    this.handleSuccessfulOMDBResponse = this.handleSuccessfulOMDBResponse.bind(
      this
    );
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
      const urlString = `${MOVIE_API_URL}?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_API_KEY}&`;
      console.log(urlString);
      fetch(urlString)
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (jsonResponse.Response === "True") {
            this.handleSuccessfulOMDBResponse(jsonResponse);
          } else {
            this.setState({
              errorMessage: jsonResponse.Error,
              loading: false,
            });
          }
        });
    }
  }

  handleSuccessfulOMDBResponse(jsonResponse) {
    var filteredMovies = jsonResponse.Search.filter(function (mov) {
      return this.find((nom) => nom.Title === mov.Title) == null;
    }, this.state.nominations);
    this.setState({
      movies: filteredMovies,
      loading: false,
    });
  }

  handleAdd(movie) {
    const nominations = this.state.nominations;
    if (nominations.length < 5 && !this.movieIsNominated(movie)) {
      nominations.push(movie);

      const movies = this.state.movies;
      var filteredMovies = movies.filter(function (nom) {
        return nom.Title !== movie.Title;
      });
      this.setState({ movies: filteredMovies });
      this.setState({ nominations });
    }
  }

  handleRemove(movie) {
    const nominations = this.state.nominations;
    var filteredNominations = nominations.filter(function (nom) {
      return nom.Title !== movie.Title;
    });
    this.setState({ nominations: filteredNominations });
  }

  movieIsNominated(movie) {
    const nominations = this.state.nominations;
    return nominations.find((nom) => nom.Title === movie.Title) != null;
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
              {this.state.movies.map((movie, index) => (
                <Movie
                  key={`${index}-${movie.Title}`}
                  movie={movie}
                  onClick={this.handleAdd}
                  isNominated={false}
                />
              ))}
            </MoviesWrapper>
          </LeftPanel>
          <RightPanel>
            <NomTitleDiv>
              <NomTitle>
                Nominations&nbsp;&nbsp;
                <Emoji symbol="🏆" label="trophy"></Emoji>
              </NomTitle>
              {this.state.nominations.length === 5 ? (
                <NomBanner>
                  You Have 5 Nominations!
                  <Emoji symbol="🎉" label="party"></Emoji>
                </NomBanner>
              ) : null}
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
