import React from 'react';

import { Card, Elevation } from "@blueprintjs/core";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Label } from 'recharts';

import { PriceAnalysis } from '../../models/models';

import './PricePortal.scss';


type Props = {
    priceAnalysis: PriceAnalysis[];
    currentPriceAnalysis: PriceAnalysis;
}

function PricePortal(props: Props) {
    const { priceAnalysis, currentPriceAnalysis } = props;

    const GREEN_HEX = "#27f8c2";
    const BLUE_HEX = "#42c7ff";

    return (
        <div className='pricePortal'>
            <Card className='pricePortal__chart' interactive={true} elevation={Elevation.FOUR}>
                <ResponsiveContainer width='95%' height={450}>
                    <LineChart
                        data={priceAnalysis}
                        margin={{ top: 5, right: 25, left: 30, bottom: 5 }}
                    >
                        <Line type="monotone" dataKey="orcaSolUsdtSpotPrice" stroke={GREEN_HEX} strokeWidth={4} />
                        <Line type="monotone" dataKey="orcaSolUsdcSpotPrice" stroke={BLUE_HEX} strokeWidth={4} />
                        <XAxis stroke="white">
                            <Label value="Seconds" position="insideBottom" dy={10} style={{ fill: 'white' }} />
                        </XAxis>
                        <YAxis stroke="white" domain={['auto', 'auto']} label={{ value: 'Price', angle: -90, position: 'insideLeft', dx: -20, style: { fill: 'white' } }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
            <Card className='pricePortal__stats' interactive={true} elevation={Elevation.FOUR}>
                <div className='pricePortal__stats-item'>
                    <h2>PRICES</h2>
                    <h3 style={{ color: GREEN_HEX }}>Orca SOL x USDT: ${currentPriceAnalysis.orcaSolUsdtSpotPrice}</h3>
                    <h3 style={{ color: BLUE_HEX }}>Orca SOL x USDC: ${currentPriceAnalysis.orcaSolUsdcSpotPrice}</h3>
                </div>
                <div className='pricePortal__stats-item'>
                    <h2>STATS</h2>
                    <h3>Arbitrage: %{currentPriceAnalysis.arbitrageOpportunityPctg}</h3>
                    <h3>Price Diff: ${Math.abs(currentPriceAnalysis.orcaSolUsdtSpotPrice - currentPriceAnalysis.orcaSolUsdcSpotPrice)}</h3>
                </div>
            </Card>
        </div>
    );
}

export default PricePortal;