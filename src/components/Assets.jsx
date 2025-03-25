import React from "react";
import styled from "styled-components";
import Asset from "../components/Asset";

export default function Assets() {

    return (
        <>

            <TitleStyled>Ativos</TitleStyled>

            <Asset/>

                
        </>
    )
}

const TitleStyled = styled.h1`
    margin: 25px 0;
`