import styled from "styled-components";
import React from "react";

const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  padding: 20px;
  flex-grow: 1;
`;

const SearchField = styled.input`
  box-sizing: border-box;
  flex-grow: 1;
  height: 50px;
  left: 50px;
  top: 407px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 10px;
  font-size: 22px;
`;

const SearchButton = styled.input`
  padding: 5px;
  background-color: #377e62;
  color: white;
  width: 90px;
  height: 31px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  border: none;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }
  &:active {
    background: #7eb7a0;
  }
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInputChanges = this.handleSearchInputChanges.bind(this);
    this.resetInputField = this.resetInputField.bind(this);
    this.callSearchFunction = this.callSearchFunction.bind(this);
    this.state = {
      searchValue: "",
    };
  }

  handleSearchInputChanges(e) {
    this.setState(
      {
        searchValue: e.target.value,
      },
      this.callSearchFunction
    );
  }

  resetInputField() {
    this.setState({
      searchValue: "",
    });
  }

  callSearchFunction(e) {
    this.props.search(this.state.searchValue);
  }

  render() {
    return (
      <SearchDiv>
        <SearchForm>
          <SearchField
            value={this.state.searchValue}
            onChange={this.handleSearchInputChanges}
            type="text"
            maxlength="100"
            onSubmit={this.callSearchFunction}
          />
        </SearchForm>
      </SearchDiv>
    );
  }
}

export default Search;
