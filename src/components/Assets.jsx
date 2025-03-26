import React from "react";
import styled from "styled-components";
import Asset from "../components/Asset";

export default function Assets( {MY_ASSETS} ) {

    const assetsWithProfitOrLoss = MY_ASSETS.map((asset) => {
        const resultProfitOrLoss = asset.currentValue - asset.acquisitionValue;
        
        const newAssets = {
            ...asset,
            profitOrLoss: resultProfitOrLoss
        };

        return newAssets;
    });

    return (
        <>
            <TitleStyled>Ativos</TitleStyled>

            <Asset assetsWithProfitOrLoss={assetsWithProfitOrLoss}/>              
        </>
    )
}

const TitleStyled = styled.h1`
    border-top: 1px solid #DEDEDF;
    padding-top: 50px;
    margin: 35px 0;
`