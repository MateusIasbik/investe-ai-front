import React, { useState } from "react";
import styled from "styled-components";

export default function Operations() {

    const [orderType, setOrderType] = useState("Compra");
    const [action, setAction] = useState("");
    const [amount, setAmount] = useState("");
    const [value, setValue] = useState("");

    console.log(orderType, action, amount, value);

    return (
        <>
            <h1>Operações</h1>
            <OperationsStyled>
                
                <InputStyled>
                    <div>
                        <h2 htmlFor="name">Tipo de ordem</h2>
                        <select
                            type=""
                            id="orderType"
                            value={orderType}
                            onChange={e => setOrderType(e.target.value)}
                        >
                            <option value="Compra">Compra</option>
                            <option value="Venda">Venda</option>
                        </select>
                    </div>

                    <div>
                        <h2 htmlFor="name">Ativo</h2>
                        <input
                            type="text"
                            id="action"
                            placeholder="Ação"
                            value={action}
                            onChange={e => setAction(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 htmlFor="name">Quantidade</h2>
                        <input
                            type="number"
                            id="amount"
                            placeholder="100"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <h2 htmlFor="name">Valor</h2>
                        <input
                            type="value"
                            id="value"
                            placeholder="R$0,00"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>

                    <button type="submit">Registrar</button>

                </InputStyled>

            </OperationsStyled>
        </>
    )
}

const OperationsStyled = styled.div`
    display: flex;
    align-items: center;
    min-width: 1025px;
    min-height: 123px;
    border-radius: 10px;
    background-color: #F6F6F6;
`

const InputStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 100%;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: #000;

    h2 {
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        color: #000;
    }

    select, input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        height: 42px;
        width: 160px;
        font-family: 'Roboto', sans-serif;
        padding: 0 11px;
        margin: 10px 0 0 0;
    }

    button {
        background-color: #4AE07F;
        color: #000;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        border: none;
        min-height: 60px;
        min-width: 180px;
        margin-top: 1%;
    }
`