import React, { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import axios from 'axios';

import './PricePortal.scss'

function PricePortal() {

    const API_URL = 'https://sol-api.dev/';

    const [orcaPrices, setOrcaPrices] = useState({ solana: 0, usdc: 0 });
    const [serumPrices, setSerumPrices] = useState({ solana: 0, usdc: 0 });
    const [raydiumPrices, setRaydiumPrices] = useState({ solana: 0, usdc: 0 });

    useEffect(() => {
        try {
            const interval = setInterval(async () => {
                const { data } = await axios({
                    url: API_URL,
                    method: 'GET',
                });
                setOrcaPrices({
                    solana: data?.orca?.solana,
                    usdc: data?.orca?.usdc
                });
                setSerumPrices({
                    solana: data?.serum?.solana,
                    usdc: data?.serum?.usdc
                });
                setRaydiumPrices({
                    solana: data?.raydium?.solana,
                    usdc: data?.raydium?.usdc
                });
                
            }, 1000);
    
            return () => clearInterval(interval);

        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <Card className='pricePortal' interactive={true} elevation={Elevation.THREE}>
            <h1>Orca DEX Price</h1>
            <h2>SOL: {orcaPrices?.solana}</h2>
            <h2>USDC: {orcaPrices?.usdc}</h2>

            <h1>Serum DEX Price</h1>
            <h2>SOL: {serumPrices?.solana}</h2>
            <h2>USDC: {serumPrices?.usdc}</h2>

            <h1>Raydium DEX Price</h1>
            <h2>SOL: {raydiumPrices?.solana}</h2>
            <h2>USDC: {raydiumPrices?.usdc}</h2>
        </Card>
    );
}

export default PricePortal;