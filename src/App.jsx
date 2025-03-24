import React from "react";
import styled from "styled-components";
import Id from "./components/Id";
import Balance from "./components/Balance";
import Operations from "./components/Operations";
import Diversification from "./components/Diversification";
import Assets from "./components/Assets";

export default function App() {
  return (
    <>
      <Top>Investe Aí</Top>
      
      <Container>
        <Id/>
        <Balance/>
        <Operations/>
        <Diversification/>
        <Assets/>
      </Container>
    </>
  )
}

const Top = styled.div`
  margin: 0;
  background-color: #191919;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  padding: 12px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  margin: 0 23%;
`;
