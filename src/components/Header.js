import React from "react";
import styled from "styled-components";

const AppHeader = styled.div`
  height: 70px;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #377e62;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
`;

const Header = (props) => {
  return <AppHeader>{props.text}</AppHeader>;
};

export default Header;
