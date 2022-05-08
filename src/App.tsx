import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

import Home from './pages/Home';
import LivePriceFeed from './pages/LivePriceFeed';
import Docs from './pages/Docs';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { SpotPrices, TokenPairs } from './models/models';

import './App.scss';


function App() {
    const API_URL = 'https://sol-api.dev/';
    // const API_URL = 'http://localhost:8000/';

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
                    url: API_URL,
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
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/livePriceFeed" element={<LivePriceFeed spotPrices={spotPrices} currentSpotPrice={currentSpotPrice} />} />
                        <Route path="/docs" element={<Docs />} />
                    </Routes>
                </Router>
            </div>
            <div className='container__footer'>
                <Footer />
            </div>
        </div>
    );
}

export default App;