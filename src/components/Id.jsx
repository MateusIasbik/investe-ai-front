import React from "react";
import styled from "styled-components";

export default function Id() {
    const idNumber = "d66416cc";

    return (
        <IdStyled>
            <h1>Seu id de investidor é: {idNumber}</h1>
        </IdStyled>
    )
}

const IdStyled = styled.div`
    h1 {
        width: 1025px;
        margin: 25px 0;
        color: #000000;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }
`