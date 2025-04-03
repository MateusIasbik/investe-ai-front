import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Id from "./components/Id";
import Balance from "./components/Balance";
import Operations from "./components/Operations";
import Diversification from "./components/Diversification";
import Assets from "./components/Assets";
import { MY_ASSETS, MY_MONEY } from './mock';
import axios from "axios";

export default function App() {

  const [myMoney, setMyMoney] = useState(MY_MONEY);
  const [myAssets, setMyAssets] = useState(MY_ASSETS);

  const updateMyMoney = (newAmount) => {
    setMyMoney(newAmount);
  };

  const updateMyAssets = (newAssets) => {
    setMyAssets(newAssets);
  };

  const sortedData = [...myAssets].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    sortedData.forEach(asset => {
      axios.get(`/api/quote?action=${asset.name}`)
        .then((response) => {
          const priceNow = Number(response.data.results[0].regularMarketPrice);
          setMyAssets(prevAsset => {
            return prevAsset.map(act => {
              if(act.name === asset.name) {
                return {...act, price: priceNow};
              }
              return act;
            })
          })
        })

        .catch((error) => {
          console.error("Erro ao buscar o banco de dados!", error);
        });
    })

  }, [myAssets]);

  return (
    <>
      <Top>Investe Aí</Top>

      <Container>
        <Id />
        <Balance sortedData={sortedData} MY_MONEY={myMoney} />
        <Operations MY_MONEY={myMoney} sortedData={sortedData} updateMyMoney={updateMyMoney} updateMyAssets={updateMyAssets} />
        <Diversification sortedData={sortedData} />
        <Assets sortedData={sortedData} />
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
  align-items: center;
  min-height: 100vh;
  margin: 80px 23% 0 23%;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;
`;
