import React, { useState } from "react";
import styled from "styled-components";
import Id from "./components/Id";
import Balance from "./components/Balance";
import Operations from "./components/Operations";
import Diversification from "./components/Diversification";
import Assets from "./components/Assets";
import { MY_ASSETS, MY_MONEY } from './mock';

export default function App() {

  const sortedData = MY_ASSETS.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const [myMoney, setMyMoney] = useState(MY_MONEY);

  // Função para atualizar MY_MONEY
  const updateMyMoney = (newAmount) => {
    setMyMoney(newAmount);
  };
  
  return (
    <>
      <Top>Investe Aí</Top>
      
      <Container>
        <Id/>
        <Balance sortedData={sortedData} MY_MONEY={myMoney} />
        <Operations sortedData={sortedData} MY_MONEY={myMoney} updateMyMoney={updateMyMoney}/>
        <Diversification sortedData={sortedData}/>
        <Assets sortedData={sortedData}/>
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
  z-index: 3;
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
