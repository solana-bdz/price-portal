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

    const [spotPrices, setSpotPrices] = useState<SpotPrices[]>([]);

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
                <YAxis stroke="black" domain={['auto', 'auto']} />
            </LineChart>
        </Card>
    );
}

export default PricePortal;