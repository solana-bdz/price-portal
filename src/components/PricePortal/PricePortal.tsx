import React, { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { TokenPairs } from '../../models/tokenPairs.models';

import './PricePortal.scss'

interface SpotPrices {
    timestamp: number,
    orcaSolUsdtSpotPrice: number
    orcaSolUsdcSpotPrice: number,
}

function PricePortal() {
    const API_URL_PROD = 'https://sol-api.dev/';
    const API_URL_DEV = 'http://localhost:8000/';
    const MIN_PRICE = 79;
    const MAX_PRICE = 79.2;

    const [spotPrices, setSpotPrices] = useState<SpotPrices[]>([]);
    const [domain, setDomain] = useState<number[]>([MIN_PRICE, MAX_PRICE]);

    const updateDomain = (latestSpotPrices: SpotPrices) => {
        let currMin = domain[0];
        let currMax = domain[1];

        if (latestSpotPrices.orcaSolUsdtSpotPrice < currMin) {
            currMin = Math.round(latestSpotPrices.orcaSolUsdtSpotPrice * 100) / 100;
        }
        if (latestSpotPrices.orcaSolUsdcSpotPrice < currMin) {
            currMin = Math.round(latestSpotPrices.orcaSolUsdcSpotPrice * 100) / 100;
        }
        if (latestSpotPrices.orcaSolUsdtSpotPrice > currMax) {
            currMax = Math.round(latestSpotPrices.orcaSolUsdtSpotPrice * 100) / 100;
        }
        if (latestSpotPrices.orcaSolUsdcSpotPrice > currMax) {
            currMax = Math.round(latestSpotPrices.orcaSolUsdcSpotPrice * 100) / 100;
        }
        return [currMin, currMax];
    }

    useEffect(() => {
        try {
            const interval = setInterval(async () => {
                const { data } = await axios.request<TokenPairs>({
                    url: API_URL_DEV,
                    method: 'GET',
                });

                const latestSpotPrices: SpotPrices = {
                    timestamp: data?.orca_sol_usdc?.timestamp,
                    orcaSolUsdtSpotPrice: data?.orca_sol_usdt?.token_a_spot_price_in_token_b,
                    orcaSolUsdcSpotPrice: data?.orca_sol_usdc?.token_a_spot_price_in_token_b,
                }
                spotPrices.push(latestSpotPrices);
                const updatedSpotPrices = [...spotPrices];
                const updatedDomain = updateDomain(latestSpotPrices);
                console.log(updatedDomain)

                setDomain(updatedDomain);
                setSpotPrices(updatedSpotPrices);
            }, 1000);

            return () => clearInterval(interval);

        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <Card className='pricePortal' interactive={true} elevation={Elevation.FOUR}>
            <LineChart 
                width={500}
                height={450}
                data={spotPrices}
                margin={{ top: 5, right: 25, left: 30, bottom: 5 }}
            >
                <Line type="monotone" dataKey="orcaSolUsdtSpotPrice" stroke="#221f20" strokeWidth={4} />
                <Line type="monotone" dataKey="orcaSolUsdcSpotPrice" stroke="#dd3e3a" strokeWidth={4} />
                <XAxis stroke="black" />
                <YAxis stroke="black" domain={domain} />
            </LineChart>
        </Card>
    );
}

export default PricePortal;