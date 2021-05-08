import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
`;

const MovieWrapper = styled.div`
  padding: 20px 20px 20px 20px;
`;

const MovieDiv = styled.div`
  // max-width: 25%;
  // @media screen and (min-width: 694px) and (max-width: 915px) {
  //   max-width: 33%;
  // }
  // @media screen and (min-width: 652px) and (max-width: 693px) {
  //   max-width: 50%;
  // }
  //  @media screen and (min-width: 651px) {
  //   max-width: 100%;
  //   margin: auto;
  // }
  background-color: black;
  border-radius: 10px;
  width: 200px;
  height: 300px;
`;

const MovieTitle = styled.div`
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
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
  //padding: 10px;
`;

const MovieYear = styled.div`
  font-size: 20x;
  color: white;
  padding-bottom: 20px;
`;

const MoviePoster = styled.img`
  border-radius: 10px;
  width: 200px;
  height: 300px;
  opacity: 0.4;
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
`;

const DEFAULT_PLACEHOLDER_IMAGE = "/images/PlaceHolderImage.png";

class Movie extends React.Component {
  render() {
    const movie = this.props.movie;
    const poster =
      movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
      <Wrapper>
        <MovieWrapper>
          <MovieDiv>
            <MovieInfo>
              <MovieTitle>{movie.Title}</MovieTitle>
              <MovieYear>{movie.Year}</MovieYear>
              <NominateButton
                isNominated={this.props.isNominated}
                onClick={() => this.props.onClick(movie)}
              >
                {this.props.isNominated ? "Remove" : "Nominate"}
              </NominateButton>
            </MovieInfo>
            <MoviePoster
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
            />
          </MovieDiv>
        </MovieWrapper>
      </Wrapper>
    );
  }
}

export default Movie;
