import React from "react";
import styled from "styled-components";
import Parallax from "./Parallax/Parallax";
import MediaQuery from "react-responsive";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MovieWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 5px 20px;
  }
`;

const MovieDiv = styled.div`
  background-color: black;
  border-radius: 10px;
  width: 200px;
  height: 300px;
  @media (max-width: 768px) {
    height: 60px;
    min-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex-grow: 1;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 10%);
    background-color: white;
  }
`;

const MovieTitle = styled.div`
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  @media (max-width: 768px) {
    padding: 0px;
    font-size: 16px;
    color: #222;
  }
`;

const MovieTitleWrapper = styled.div`
  @media (max-width: 768px) {
    text-align: left;
    flex-grow: 1;
  }
`;

const MovieInfo = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: 300px;
  z-index: 100;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    padding: 0px 0px 0px 20px;
    flex-direction: row;
    width: auto;
    height: auto;
    position: relative;
    flex-grow: 1;
  }
`;

const MovieYear = styled.div`
  font-size: 20x;
  color: white;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    padding: 0px;
    font-size: 13px;
    color: #666;
  }
`;

const MoviePoster = styled.img`
  border-radius: 10px;
  width: 200px;
  height: 300px;
  opacity: 0.4;
  @media (max-width: 768px) {
    opacity: 1;
    width: 50px;
    min-width: 50px;
    height: 60px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

const NominateButton = styled.button`
  background-color: ${(props) => (props.isNominated ? "#DC5252" : "#377e62")};
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;

  &:disabled {
    background: #adccbf;
  }
  @media (max-width: 768px) {
    flex-shrink: 1;
    width: 100px;
    min-width: 100px;
    height: 60px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
  }
`;

const DEFAULT_PLACEHOLDER_IMAGE = "/images/PlaceHolderImage.png";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.renderMovie = this.renderMovie.bind(this);
  }

  truncate(str) {
    return str.length > 30 ? str.substring(0, 27) + "..." : str;
  }

  renderMovie(movie) {
    const poster =
      movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
      <MovieWrapper>
        <MovieDiv>
          <MovieInfo>
            <MovieTitleWrapper>
              <MovieTitle>{this.truncate(movie.Title)}</MovieTitle>
              <MovieYear>{movie.Year}</MovieYear>
            </MovieTitleWrapper>
            <NominateButton
              isNominated={this.props.isNominated}
              onClick={() => this.props.onClick(movie)}
              disabled={this.props.buttonDisabled}
            >
              {this.props.isNominated ? "Remove" : "Nominate"}
            </NominateButton>
          </MovieInfo>
          <MoviePoster alt={`The movie titled: ${movie.Title}`} src={poster} />
        </MovieDiv>
      </MovieWrapper>
    );
  }

  render() {
    const movie = this.props.movie;
    return (
      <Wrapper>
        <MediaQuery maxWidth={768}>{this.renderMovie(movie)}</MediaQuery>
        <MediaQuery minWidth={769}>
          <Parallax
            onClick={() => this.props.onClick(movie)}
            style={{ width: 200, height: 300 }}
          >
            {this.renderMovie(movie)}
          </Parallax>
        </MediaQuery>
      </Wrapper>
    );
  }
}

export default Movie;
