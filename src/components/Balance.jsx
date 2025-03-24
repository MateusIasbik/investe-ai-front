import React from "react";
import styled from "styled-components";

export default function Balance() {

    const balanceDisponible = 287.83;
    const soma = 250000.00;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    return (
        <OperationsStyled>
            <BoxStyled>
                <h1>Disponível para investir</h1>
                <h2>{formatCurrency(balanceDisponible)}</h2>
            </BoxStyled>
            <BoxStyled>
                <h1>Patrimônio de investimentos</h1>
                <h3>{formatCurrency(soma)}</h3>
            </BoxStyled>
        </OperationsStyled>
    )
}

const OperationsStyled = styled.div`
    min-width: 1025px;
    display: flex;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    justify-content: space-between;
`

const BoxStyled = styled.div`
    display: flex;
    border-radius: 11px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 140px;
    width: 48%;
    background-color: #F1F5F8;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    
    h1 {
        font-size: 16px;
        color: #000000;
        padding-bottom: 10px;
    }

    h2 {
        font-size: 40px;
        color: #191919;
    }

    h3 {
        font-size: 40px;
        color: #205934;
    }
`