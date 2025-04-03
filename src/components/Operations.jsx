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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    useEffect(() => {

        if (orderType === "Aporte") {
            setValue("");
            setPlaceholder("R$ 0,00");
            setAmount("");
            setAction("");
        }

        if (orderType !== "Aporte" && (action.length > 6 || action.length < 5)) {
            setValue("");
            setAmount("100");
            setPlaceholder("");
        }

        if (orderType !== "Aporte" && (action.length >= 5)) {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const priceNow = response.data.results[0].regularMarketPrice;
                    if (priceNow) {
                        const numericValue = formatCurrency(amount * priceNow);
                        setValue(numericValue);
                    } else {
                        setValue("R$ 0,00");
                        setPlaceholder("");
                    }
                })
                .catch(() => {
                    if (action.length >= 6) {
                        toast.error("O ativo digitado não existe, tente novamente!");
                    }
                    setValue("");
                });
        }

    }, [action, amount, orderType]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanCurrency = (currencyString) => {
            const str = String(currencyString);
            return parseFloat(str.replace("R$", "").replace(/\./g, "").replace(",", "."));
        };

        const numericValue = parseFloat(value.replace(",", "."));

        if (orderType === "Aporte" && numericValue <= 10000 && numericValue > 0) {
            updateMyMoney(MY_MONEY + numericValue);
            setValue("");
            toast.success(`O aporte de ${formatCurrency(numericValue)} foi realizado com sucesso!`);
        } else if (orderType === "Aporte" && isNaN(numericValue) || numericValue <= 0 || numericValue > 10000) {
            toast.error("O valor do aporte deve ser um número e estar entre R$ 1,00 e R$10.000,00");
        }

        if (orderType === "Compra" && cleanCurrency(value) > MY_MONEY) {
            toast.error("Não há saldo suficiente, faça um aporte ou reduza a quantidade a ser adquirida!");
            return;
        }

        if (orderType === "Compra" && value && amount && action) {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const lastID = (sortedData.length === 0) ? 1 : sortedData[sortedData.length - 1].id + 1; // MUDAR ISTO, PEGAR ID DO BANCO CRIADO AUTOMATICAMENTE
                    const correctName = response.data.results[0].symbol;
                    const priceNow = Number(response.data.results[0].regularMarketPrice);
                    const acquisitionValue = cleanCurrency(value);
                    const currentValueNumber = priceNow * amount;

                    const newAction = {
                        id: lastID, //VERIFICAR ID
                        name: correctName,
                        price: priceNow,
                        amount: Number(amount),
                        currentValue: currentValueNumber,
                        acquisitionValue: acquisitionValue
                    }

                    if (!sortedData.some(item => item.name === correctName)) {
                        toast.success(`A compra de ${amount} ações de ${action.toUpperCase()} foi realizada com sucesso!`);

                        updateMyAssets([...sortedData, newAction]);

                        setValue("");
                        setAction("");
                        updateMyMoney(MY_MONEY - cleanCurrency(value));

                    } else {
                        const newData = sortedData.map(item => {
                            if (item.name.toUpperCase() === correctName.toUpperCase()) {
                                return {
                                    ...item,
                                    amount: Number(item.amount) + Number(amount),
                                    currentValue: (priceNow * (Number(item.amount) + Number(amount))),
                                    acquisitionValue: cleanCurrency(item.acquisitionValue) + cleanCurrency(value)
                                }
                            }

                            return item;

                        })

                        toast.success(`A compra de ${amount} ações de ${action.toUpperCase()} foi realizada com sucesso!`);

                        updateMyAssets(newData);

                        setValue("");
                        setAction("");
                        updateMyMoney(MY_MONEY - cleanCurrency(value));

                    }
                })

                .catch((error) => {
                    console.error("Erro ao buscar o banco de dados!", error);
                });
        }

        if (orderType === "Venda" && value && amount && action) {
            axios.get(`http://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`)
                .then((response) => {
                    const priceNow = Number(response.data.results[0].regularMarketPrice);
                    const currentValueNumber = priceNow * amount;

                    const actionExists = sortedData.some(act => act.name.toUpperCase() === action.toUpperCase());
                    if (!actionExists) {
                        toast.error(`Você não possui ativos de ${action.toUpperCase()} para venda.`);
                        return;
                    }

                    const updatedAssets = sortedData.map(act => {
                        if (act.name.toUpperCase() === action.toUpperCase()) {

                            if (Number(act.amount) < Number(amount)) {
                                toast.error(`A quantidade máxima de ações que você pode vender é de ${act.amount}`);

                                return act;
                            } else {
                                const updateAction = {
                                    ...act,
                                    amount: Number(act.amount) - Number(amount),
                                    currentValue: currentValueNumber,
                                    acquisitionValue: (act.acquisitionValue / act.amount) * (act.amount - Number(amount))
                                };

                                if (updateAction.amount === 0) {
                                    toast.success(`A venda de ${amount} ações de ${action.toUpperCase()} foi realizada com sucesso!`);
                                    updateMyMoney(MY_MONEY + currentValueNumber);
                                    return null;
                                }

                                toast.success(`A venda de ${amount} ações de ${action.toUpperCase()} foi realizada com sucesso!`);
                                updateMyMoney(MY_MONEY + currentValueNumber);
                                return updateAction;
                            }
                        }

                        return act;

                    });

                    const filteredAssets = updatedAssets.filter(item => item !== null);

                    updateMyAssets(filteredAssets);

                    setValue("");
                    setAmount("100");
                    setAction("");
                })

                .catch((error) => {
                    console.error("Erro ao buscar o banco de dados!", error);
                });
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
    width: 1025px;
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