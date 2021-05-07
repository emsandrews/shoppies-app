import styled from "styled-components";
import React, { Component } from "react";
import { withRouter, Route, Switch, browserHistory } from "react-router-dom";

const Parent = styled.image`
  background-image: "/images/Ellipse-5.png";
`;

const Wrapper = styled.div`
  flex-direction: row;
  display: flex;
  height: 100vh;
`;

const Wave = styled.div`
  position: absolute;
  width: 1166.26px;
  height: 1032.93px;
  left: 108.52px;
  top: -189.07px;

  background: rgba(227, 248, 247, 0.42);
`;

const LeftPane = styled.div`
  height: 100%;
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const RightPane = styled.div`
  width: 50%;
  height: 100%;
  //background-color: rgba(227, 248, 247, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: flex;
  text-align: left;
  justify-content: left;
  flex-direction: column;
`;

const Title = styled.div`
  color: #377e62;
  font-size: 50px;
  padding: 10px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  color: #636669;
  font-size: 15px;
  padding: 10px;
`;

const ShoppiesLogo = styled.img`
  max-width: 100%;
  max-height: 70%;
`;

const EnterButton = styled.button`
  height: 50px;
  width: 150px;
  margin-top: 200px;
  margin-left: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #377e62;
  outline: none;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  &:disabled {
    background: #7eb7a0;
    &:hover {
      filter: none;
    }
  }

  &:active {
    background: #7eb7a0;
  }
`;

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.history.push("/Shoppies");
  };

  render() {
    return (
      <Parent>
        <Wrapper>
          <LeftPane>
            <FormWrapper>
              <Title>The Shoppies.</Title>
              <SubTitle>Brought to you by Shopify</SubTitle>
              <EnterButton onClick={this.handleClick} type="button">
                Enter Site
              </EnterButton>
            </FormWrapper>
          </LeftPane>
          <RightPane>
            <ShoppiesLogo src="/images/shoppies-logo.png" />
          </RightPane>
        </Wrapper>
      </Parent>
    );
  }
}

export default withRouter(LandingPage);
