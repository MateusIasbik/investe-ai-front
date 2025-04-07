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
    const fetchAssetPrices = async () => {
      
      const updatedAssets = await Promise.all(myAssets.map(async (asset) => {
        try {
          const response = await axios.get(`https://brapi.com.br/api/quote/${asset.name}?token=gzt1E342VQo1gcijzdazAF`);
          const priceNow = Number(response.data.results[0].regularMarketPrice);
          return { ...asset, price: priceNow };
        } catch (error) {
          console.error("Erro ao buscar o preço do ativo", asset.name, error);
          return asset;
        }
      }));

      setMyAssets(updatedAssets);
    };

    fetchAssetPrices();
  }, []);

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
  width: 100%;
  margin: 70px 25% 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: auto;
  }
`;
