import React, { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import './PricePortal.scss'

import { Price } from '../../models/models';


function PricePortal() {
    const API_URL_PROD = 'https://sol-api.dev/';
    const API_URL_DEV = 'http://localhost:8000/';

    const [prices, setPrices] = useState<Price[]>([]);

    useEffect(() => {
        try {
            const interval = setInterval(async () => {
                const { data } = await axios({
                    url: API_URL_DEV,
                    method: 'GET',
                });

                const price = {
                    date: data?.orca?.timestamp,
                    price: data?.orca?.token_a_spot_price_in_token_b
                }
                prices.push(price);
                const newPrices = [...prices];
                
                setPrices(newPrices);
            }, 1000);

            return () => clearInterval(interval);

        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <Card className='pricePortal' interactive={true} elevation={Elevation.FOUR}>
            <LineChart width={500} height={450} data={prices}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <XAxis dataKey="date" />
                <YAxis domain={[80.95,81.05]} />
            </LineChart>
        </Card>
    );
}

export default PricePortal;