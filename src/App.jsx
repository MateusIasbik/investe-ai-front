import React from "react";
import styled from "styled-components";
import Id from "./components/Id";
import Balance from "./components/Balance";
import Operations from "./components/Operations";
import Diversification from "./components/Diversification";
import Assets from "./components/Assets";
import MY_ASSETS from "./mock";

export default function App() {
  
  return (
    <>
      <Top>Investe Aí</Top>
      
      <Container>
        <Id/>
        <Balance/>
        <Operations/>
        <Diversification/>
        <Assets MY_ASSETS={MY_ASSETS}/>
      </Container>
    </>
  )
}

const Top = styled.div`
  width: 100%;
  margin: 0;
  background-color: #191919;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  padding: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
  margin: 80px 23% 0 23%;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;
`;
