import React, { PureComponent } from "react";
import styled from "styled-components";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function Diversification( {MY_ASSETS}) {

    const totalAmount = MY_ASSETS.reduce((acc, asset) => acc + asset.amount, 0);

    const data = MY_ASSETS.map((asset) => {

        const percentage = (asset.amount / totalAmount) * 100;

        return {
            name: asset.name,
            amount: percentage.toFixed(2)
        }
    });

    console.log(data);

    return (
        <div>
            <TitleStyled>Diversificação</TitleStyled>

            {/* -------------------------------------------------------------- */}



            {/* --------------------------------------------------------------------- */}

        </div>
    )
}


const TitleStyled = styled.h1`
    margin: 25px 0;
`

