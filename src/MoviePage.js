import styled from "styled-components";
import React, { Component } from "react";

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  height: 100vh;
  //background-color: #fdffff;
`;

const Header = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //background-color: green;
`;

const SubHeader = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  //background-color: blue;
`;

const Title = styled.div`
  height: 30px;
  width: 300px;
  display: flex;
  padding: 20px;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  justify-content: flex-start;
  font-size: 25px;
  color: #377e62;
  font-weight: bold;
`;

const SubTitle = styled.div`
  height: 20px;
  width: 300px;
  display: flex;
  padding-left: 25px;
  justify-content: flex-start;
  font-size: 15px;
  color: #636669;
`;

const NominationsPanel = styled.div`
  min-height: 250px;
  max-height: 500px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
`;

const SearchPanel = styled.div`
  height: 50px;
  padding: 25px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  //background-color: blue;
`;

const SearchBar = styled.div`
  width: 278px;
  height: 31px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
`;

const MoviePanel = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  //background-color: yellow;
`;

const MovieCard = styled.div`
  width: 130px;
  height: 214px;
  margin: 25px;
  border-radius: 10px;
  background-color: rgba(227, 248, 247, 0.42);
  display: flex;
  order: 1;
`;

class MoviePage extends React.Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Title>The Shoppies.</Title>
        </Header>
        <SubHeader>
          <SubTitle>Nominations</SubTitle>
        </SubHeader>
        <NominationsPanel></NominationsPanel>
        <SubHeader>
          <SubTitle>Find a Movie</SubTitle>
        </SubHeader>
        <SearchPanel>
          <SearchBar></SearchBar>
        </SearchPanel>
        <SubHeader>
          <SubTitle>Movies</SubTitle>
        </SubHeader>
        <MoviePanel></MoviePanel>
      </Wrapper>
    );
  }
}

export default LandingPage;
