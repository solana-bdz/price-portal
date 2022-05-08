import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import PricePortal from './components/PricePortal/PricePortal';
import Footer from './components/Footer/Footer';

import { SpotPrices, TokenPairs } from './models/tokenPairs.models';

import './App.scss';


function App() {
    const API_URL_PROD = 'https://sol-api.dev/';
    // const API_URL_DEV = 'http://localhost:8000/';

    const [spotPrices, setSpotPrices] = useState<SpotPrices[]>([]);
    const [currentSpotPrice, setCurrentSpotPrice] = useState<SpotPrices>({
        timestamp: 0,
        orcaSolUsdtSpotPrice: 0,
        orcaSolUsdcSpotPrice: 0
    });

    useEffect(() => {
        try {
            const interval = setInterval(async () => {
                const { data } = await axios.request<TokenPairs>({
                    url: API_URL_PROD,
                    method: 'GET',
                });

                const currentSpotPrices: SpotPrices = {
                    timestamp: data?.orca_sol_usdc?.timestamp,
                    orcaSolUsdtSpotPrice: data?.orca_sol_usdt?.token_a_spot_price_in_token_b,
                    orcaSolUsdcSpotPrice: data?.orca_sol_usdc?.token_a_spot_price_in_token_b,
                }
                spotPrices.push(currentSpotPrices);
                const updatedSpotPrices = [...spotPrices];

                setCurrentSpotPrice(currentSpotPrices);;
                setSpotPrices(updatedSpotPrices);
            }, 1000);

            return () => clearInterval(interval);

        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <div className='container'>
            <div className='container__header'>
                <Header />
            </div>
            <div className='container__body'>
                <div className='container__body-dexs'>
                    <PricePortal 
                        spotPrices={spotPrices}
                    />
                </div>
            </div>
            <div className='container__footer'>
                <Footer 
                    currentSpotPrice={currentSpotPrice}
                />
            </div>
        </div>

    );
}

export default App;