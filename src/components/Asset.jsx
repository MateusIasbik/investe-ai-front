import React from "react";
import styled from "styled-components";

export default function Asset( {assetsWithProfitOrLoss} ) {

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    return (
        <>

            {assetsWithProfitOrLoss.map((asset) => (
                <BoxStyled key={asset.id}>

                    <h1>{asset.name}</h1>

                    <div>
                        <h2>Cotação</h2>
                        <p>{formatCurrency(asset.price)}</p>
                    </div>

                    <div>
                        <h2>Quantidade</h2>
                        <p>{asset.amount}</p>
                    </div>

                    <div>
                        <h2>Valor Atual</h2>
                        <p>{formatCurrency(asset.currentValue)}</p>
                    </div>

                    <div>
                        <h2>Valor de Aquisição</h2>
                        <p>{formatCurrency(asset.acquisitionValue)}</p>
                    </div>

                    <div>
                        <h2>Lucro ou Prejuízo</h2>
                        <h3
                            style={{
                                color: asset.profitOrLoss < 0 ? '#E43E3E' : '#205934'
                            }}
                        >{formatCurrency(Math.abs(asset.profitOrLoss))}</h3>
                    </div>

                </BoxStyled>

            ))}


        </>
    )
}

const TitleStyled = styled.h1`
    margin: 25px 0;
`

const BoxStyled = styled.div`
    border: 1px solid #DBDBDB;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    max-height: 91px;
    min-width: 1025px;
    margin-bottom: 15px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 25px 0;
    }
    
    h1 {
        color: #000000;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        padding-left: 25px;
    }
    
    h2 {
        color: #5B6D76;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        padding-bottom: 5px;
    }
    
    p {
        padding-top: 2px;
        color: #000000;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    h3 {
        padding-top: 2px;
        color: #205934;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
    }
`