import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Operations({ sortedData }) {

    const [orderType, setOrderType] = useState("Compra");
    const [action, setAction] = useState("");
    const [amount, setAmount] = useState("1");
    const [value, setValue] = useState("");
    const [contributionValue, setContributionValue] = useState(null); //VALOR DEVE SER ENVIADO PARA O BANCO DE DADOS
    const [placeholder, setPlaceholder] = useState("");

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    function contribution() {
        const numericValue = parseFloat(value);

        if (orderType === "Aporte" && numericValue <= 10000 && numericValue > 0) {
            toast.success(`O aporte de ${formatCurrency(numericValue)} foi realizado com sucesso!`);
            return numericValue;
        } else if (orderType === "Aporte" && numericValue > 10000) {
            toast.error("O valor do aporte deve estar entre R$ 1,00 e R$10.000,00");
            return null;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const contribValue = contribution();

        if (contribValue) {
            setContributionValue(contribValue);
            console.log("O aporte foi realizado com sucesso!", contribValue);
        }

        if (action !== "") {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const data = response.data.results[0].regularMarketPrice;
                    if (data === undefined) {
                        toast.error("O ativo digitado não existe, tente novamente!");
                        console.error("Ação não encontrada!");
                        return;
                    }
                    toast.success(`O aporte de ${action} no valor total de ${formatCurrency(amount * value)} foi realizado com sucesso!`);
                    console.log(`O valor da ação ${action} é ${data}`);
                })
                .catch((error) => {
                    console.error("Erro ao buscar o banco de dados!", error);
                });
        }

    };

    useEffect(() => {

        if (action.length !== 5) {
            setValue("");
            setPlaceholder("");
        }

        if (action !== "" && action.length === 5) {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const data = response.data.results[0].regularMarketPrice;
                    if (data) {
                        const numericValue = formatCurrency(amount * data);
                        setValue(numericValue);
                    } else {
                        setValue("R$ 0,00");
                        setPlaceholder("");
                    }
                })
                .catch((error) => {
                    toast.error("O ativo digitado não existe, tente novamente!");
                    setValue("");
                });

        }
    }, [action, amount]);

    return (
        <>
            <TitleStyled>Operações</TitleStyled>
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
                            <option value="Aporte">Aporte</option>
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
                            placeholder={amount}
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 htmlFor="name">Valor</h2>
                        <input
                            type="value"
                            id="value"
                            placeholder={placeholder}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>

                    <button onClick={handleSubmit} type="submit">Registrar</button>

                </InputStyled>

            </OperationsStyled>

            <ToastContainer style={{ fontSize: 14, color: '#CCC', padding: '80px 10px' }}
                toastStyle={{
                    lineHeight: "1.4",
                    backgroundColor: '#333',
                    color: '#fff'
                }}

            />
        </>
    )
}

const TitleStyled = styled.h1`
    margin: 35px 0;
`

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
    justify-content: space-evenly;
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
        border: 1px solid #DBDBDB;
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