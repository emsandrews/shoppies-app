import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = styled.div`
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
`;

const bounce = keyframes`
  0%, 100% { transform: scale(0.0) }
  50% { transform: scale(1.0) }
`;

const DoubleBounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: ${bounce} 2s infinite ease-in-out;
  animation: ${bounce} 2s infinite ease-in-out;
`;

const DoubleBounce2 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: ${bounce} 2s infinite ease-in-out;
  animation: ${bounce} 2s infinite ease-in-out;

  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Spinner>
        <DoubleBounce1></DoubleBounce1>
        <DoubleBounce2></DoubleBounce2>
      </Spinner>
    );
  }
}

export default Loader;
