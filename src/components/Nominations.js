import React from "react";
import styled from "styled-components";
import Movie from "./Movie";

const NomWrapper = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

class Nominations extends React.Component {
  constructor(movies) {
    super(movies);
    this.movies = [];
  }

  addMovies(movie) {
    this.movies.push(movie);
  }

  removeMovies(movie) {
    for (let i = 0; i <= this.movies.length; i++) {
      if (this.movie.Title === movie[i].Title) {
        this.movies.splice(i, 1);
      }
    }
  }

  getNominations(movies) {
    const movie = movies.map((movie, index) => (
      <Movie key={`${index}-${movie.Title}`} movie={movie} />
    ));
    return movie;
  }

  render() {
    return (
      <NomWrapper>
        <Movie></Movie>
      </NomWrapper>
    );
  }
}

export default Nominations;
