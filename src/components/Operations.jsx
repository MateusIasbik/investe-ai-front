import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Operations({ MY_MONEY, sortedData, updateMyMoney, updateMyAssets }) {

    const [orderType, setOrderType] = useState("Compra");
    const [action, setAction] = useState("");
    const [amount, setAmount] = useState("100");
    const [value, setValue] = useState("");
    const [placeholder, setPlaceholder] = useState("");

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanCurrency = (currencyString) => {
            return parseFloat(currencyString.replace("R$", "").replace(".", "").replace(",", "."));
        };

        const contribValue = contribution();

        if (orderType === "Aporte" && contribValue !== undefined) {
            updateMyMoney(MY_MONEY + contribValue);
            setValue("");
        } else if (orderType === "Aporte" && contribValue === undefined) {
            toast.error("O valor digitado está incorreto. Tente novamente!");
        }

        if (orderType === "Compra" && value && amount && action) {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const lastID = sortedData[sortedData.length - 1].id + 1; // MUDAR ISTO, PEGAR ID DO BANCO
                    const correctName = response.data.results[0].symbol;
                    const data = Number(response.data.results[0].regularMarketPrice);
                    const acquisitionValue = cleanCurrency(value);
                    const currentValueNumber = data * amount;

                    const newAction = {
                        id: lastID,
                        name: correctName,
                        price: data,
                        amount: Number(amount),
                        currentValue: currentValueNumber,
                        acquisitionValue: acquisitionValue
                    }

                    console.log("MINHA NOVA AÇÃO É:", newAction);

                    if (!sortedData.includes(correctName)) {
                        updateMyAssets([...sortedData, newAction]);

                        setValue("");
                        setAmount("100");
                        setAction("");
                    } else {
                        const updatedAssets = sortedData.map((item) => {
                            if (item.name === correctName) {
                                const previousAmount = parseInt(item.amount);
                                const previousAcquisitionValue = parseFloat(item.acquisitionValue.replace("R$", "").replace(",", "."));
                                const newAmount = parseInt(amount);
                                const newAcquisitionValue = parseFloat(value.replace("R$", "").replace(",", "."));

                                const totalAmount = previousAmount + newAmount;
                                const totalValue = (previousAcquisitionValue * previousAmount) + (newAcquisitionValue * newAmount);
                                const newAverageValue = totalValue / totalAmount;

                                return {
                                    ...item,
                                    amount: totalAmount.toString(),
                                    acquisitionValue: formatCurrency(newAverageValue),
                                    currentValue: formatCurrency(newAverageValue * totalAmount) 
                                };
                            }
                            return item;
                        });

                        updateMyAssets(updatedAssets);

                        setValue("");
                        setAmount("100");
                        setAction("");
                    }
                })

                .catch((error) => {
                    console.error("Erro ao buscar o banco de dados!", error);
                });
        }

        if (action !== "") {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const data = response.data.results[0].regularMarketPrice;
                    if (data === undefined) {
                        toast.error("O ativo digitado não existe, tente novamente!");
                        return;
                    }

                    // console.log(response.data.results[0]);
                    toast.success(`O aporte de ${action} no valor total de ${formatCurrency(data * amount)} foi realizado com sucesso!`);
                })
                .catch((error) => {
                    console.error("Erro ao buscar o banco de dados!", error);
                });
        }

    };

    function contribution() {
        const numericValue = parseFloat(value.replace(",", "."));

        if (orderType === "Aporte" && numericValue <= 10000 && numericValue > 0) {
            toast.success(`O aporte de ${formatCurrency(numericValue)} foi realizado com sucesso!`);
            return numericValue;
        } else if (orderType === "Aporte" && numericValue > 10000) {
            toast.error("O valor do aporte deve estar entre R$ 1,00 e R$10.000,00");
            return null;
        }
    }

    useEffect(() => {

        if (orderType === "Aporte") {
            setValue("");
            setPlaceholder("R$ 0,00");
            setAmount("");
            setAction("");
        }

        if (orderType !== "Aporte" && action.length !== 5) {
            setValue("");
            setAmount("100");
            setPlaceholder("");
        }

        if (orderType !== "Aporte" && action !== "" && action.length === 5) {
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
    }, [action, amount, orderType]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

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
                            onKeyDown={handleKeyDown}
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