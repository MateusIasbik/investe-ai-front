import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Id() {
    const [idNumber, setIdNumber] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let storedId = urlParams.get("id");

        if (!storedId) {
            storedId = localStorage.getItem("token");
        }

        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem("token", storedId);
        }

        setIdNumber(storedId);

    }, []);

    return (
        <IdStyled>
            <h1>Seu id de investidor é: {idNumber}</h1>
        </IdStyled>
    )
}

const IdStyled = styled.div`
    width: 100%;

    h1 {
        margin: 25px 0;
        color: #000000;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;

        @media (max-width: 768px) {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
`