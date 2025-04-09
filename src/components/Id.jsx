import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Id({ token, setToken }) {
    const [idCode, setIdCode] = useState("");

    useEffect(() => {

        let storedToken = token;
        
            if (!storedToken) {
              storedToken = localStorage.getItem("token");
            }
        
            if (!storedToken) {
              storedToken = uuidv4();
              localStorage.setItem("token", storedToken);
            }
            
            setIdCode(storedToken);
            setToken(storedToken);
    }, []);

    return (
        <IdStyled>
            <h1>Seu id de investidor é: {idCode}</h1>
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
    }

    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 14px;
            width: 90%;
            text-align: center;
        }
    
    }
`