import React from "react";
import styled from "styled-components";
import Asset from "../components/Asset";

export default function Assets({ sortedData }) {

    const assetsWithProfitOrLoss = sortedData.map((asset) => {
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
            <AssetsStyled>
                <Asset assetsWithProfitOrLoss={assetsWithProfitOrLoss} />
            </AssetsStyled>
        </>
    )
}

const TitleStyled = styled.h1`
    border-top: 1px solid #DEDEDF;
    padding-top: 50px;
    margin: 35px 0;
    width: 1025px;
    background-color: ;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const AssetsStyled = styled.div`
    width: 1025px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`   