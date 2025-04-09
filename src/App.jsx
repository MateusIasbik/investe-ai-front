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

  const [token, setToken] = useState("");
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
      <ScreenStyled>
        <TopStyled>Investe Aí</TopStyled>

        <ContainerStyled>
            <Id token={token} setToken={setToken}/>
          <Balance sortedData={sortedData} MY_MONEY={myMoney} />
          <Operations MY_MONEY={myMoney} sortedData={sortedData} updateMyMoney={updateMyMoney} updateMyAssets={updateMyAssets} />
          <Diversification sortedData={sortedData} />
          <Assets sortedData={sortedData} />
        </ContainerStyled>
      </ScreenStyled>
  )
}

const ScreenStyled = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const TopStyled = styled.div`
  width: 100%;
  background-color: #191919;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  position: fixed;
  z-index: 3;

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

const ContainerStyled = styled.div`
  position: relative;
  top: 70px;
  height: 100%;
  width: 1026px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }
`;
