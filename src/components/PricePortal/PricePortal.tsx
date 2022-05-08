import React from 'react';

import { Card, Elevation } from "@blueprintjs/core";
import { LineChart, Line, XAxis, YAxis, Label } from 'recharts';

import { PriceAnalysis } from '../../models/models';

import './PricePortal.scss';


type Props = {
    priceAnalysis: PriceAnalysis[];
    currentPriceAnalysis: PriceAnalysis;
}

function PricePortal(props: Props) {
    const { priceAnalysis, currentPriceAnalysis } = props;

    return (
        <div className='pricePortal'>
            <Card className='pricePortal__chart' interactive={true} elevation={Elevation.FOUR}>
                <LineChart
                    width={750}
                    height={450}
                    data={priceAnalysis}
                    margin={{ top: 5, right: 25, left: 30, bottom: 5 }}
                >
                    <Line type="monotone" dataKey="orcaSolUsdtSpotPrice" stroke="#4ecead" strokeWidth={4} />
                    <Line type="monotone" dataKey="orcaSolUsdcSpotPrice" stroke="#7dcbeb" strokeWidth={4} />
                    <XAxis stroke="white">
                        <Label value="Seconds" position="insideBottom" dy={10} style={{ fill: 'white' }} />
                    </XAxis>
                    <YAxis stroke="white" domain={['auto', 'auto']} label={{ value: 'Price', angle: -90, position: 'insideLeft', dx: -20, style: { fill: 'white' } }} />
                </LineChart>
            </Card>
            <Card className='pricePortal__stats' interactive={true} elevation={Elevation.FOUR}>
                <div className='pricePortal__stats-item'>
                    <h1>Prices</h1>
                    <h3 style={{ color: "#4ecead" }}>Orca SOL x USDT: ${currentPriceAnalysis.orcaSolUsdtSpotPrice}</h3>
                    <h3 style={{ color: "#7dcbeb" }}>Orca SOL x USDC: ${currentPriceAnalysis.orcaSolUsdcSpotPrice}</h3>
                </div>
                <div className='pricePortal__stats-item'>
                    <h1>Stats</h1>
                    <h3>Arbitrage %: {currentPriceAnalysis.arbitrageOpportunityPctg}</h3>
                    <h3>Coefficient: {currentPriceAnalysis.arbitrageOpportunity}</h3>
                </div>
            </Card>
        </div>
    );
}

export default PricePortal;