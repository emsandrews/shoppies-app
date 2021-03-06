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
  -webkit-appearance: none;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 10px;
  font-size: 22px;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInputChanges = this.handleSearchInputChanges.bind(this);
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

  submitForm(e) {
    e.preventDefault();
    return false;
  }

  callSearchFunction(e) {
    this.props.search(this.state.searchValue);
  }

  render() {
    return (
      <SearchDiv>
        <SearchForm onSubmit={this.submitForm}>
          <SearchField
            value={this.state.searchValue}
            onChange={this.handleSearchInputChanges}
            type="text"
            maxlength="100"
          />
        </SearchForm>
      </SearchDiv>
    );
  }
}

export default Search;
