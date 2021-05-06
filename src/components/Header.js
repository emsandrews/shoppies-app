import React from "react";
import styled from "styled-components";

const AppHeader = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: #377e62;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
`;

const Header = (props) => {
  return <AppHeader>{props.text}</AppHeader>;
};

export default Header;
