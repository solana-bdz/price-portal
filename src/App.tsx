import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import Home from './pages/Home';
import LivePriceFeed from './pages/LivePriceFeed';
import Docs from './pages/Docs';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { PriceAnalysis, TokenPairs } from './models/models';

import './App.scss';


function App() {
    // const API_URL = 'https://sol-api.dev/';
    const API_URL = 'http://localhost:8000/';

    const [priceAnalysis, setPriceAnalysis] = useState<PriceAnalysis[]>([]);
    const [currentPriceAnalysis, setCurrentSpotPrice] = useState<PriceAnalysis>({
        timestamp: 0,
        orcaSolUsdtSpotPrice: 0,
        orcaSolUsdcSpotPrice: 0,
        arbitrageOpportunity: 0,
        arbitrageOpportunityPctg: 0
    });

    useEffect(() => {
        try {
            const interval = setInterval(async () => {
                const { data } = await axios.request<TokenPairs>({
                    url: API_URL,
                    method: 'GET',
                });

                const currentPriceAnalysis: PriceAnalysis = {
                    timestamp: data?.orca_sol_usdc?.timestamp,
                    orcaSolUsdtSpotPrice: data?.orca_sol_usdt?.token_a_spot_price_in_token_b,
                    orcaSolUsdcSpotPrice: data?.orca_sol_usdc?.token_a_spot_price_in_token_b,
                    arbitrageOpportunity: data?.arbitrage_analysis?.arbitrage_opportunity,
                    arbitrageOpportunityPctg: data?.arbitrage_analysis?.arbitrage_opportunity_pctg
                }
                priceAnalysis.push(currentPriceAnalysis);
                const updatedPriceAnalysis = [...priceAnalysis];

                setCurrentSpotPrice(currentPriceAnalysis);;
                setPriceAnalysis(updatedPriceAnalysis);
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
                        <Route path="/livePriceFeed" element={<LivePriceFeed priceAnalysis={priceAnalysis} currentPriceAnalysis={currentPriceAnalysis} />} />
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