import React from "react";
import styled from "styled-components";
import Asset from "../components/Asset";
import MY_ASSETS from "../mock";

export default function Assets() {

    const profitOrLoss = MY_ASSETS.map((asset) => {
        const resultProfitOrLoss = asset.currentValue - asset.acquisitionValue;
        
        const newAssets = {
            ...asset,
            profitOrLoss: resultProfitOrLoss
        };

        return newAssets;
    });

    console.log(profitOrLoss);


    return (
        <>

            <TitleStyled>Ativos</TitleStyled>

            <Asset profitOrLoss={profitOrLoss}/>

                
        </>
    )
}

const TitleStyled = styled.h1`
    margin: 25px 0;
`