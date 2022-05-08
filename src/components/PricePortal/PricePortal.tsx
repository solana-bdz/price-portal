import React, { useState, useEffect } from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { SpotPrices } from '../../models/tokenPairs.models';

import './PricePortal.scss'

type Props = {
    spotPrices: SpotPrices[];
}

function PricePortal(props: Props) {
    const { spotPrices } = props;

    return (
        <Card className='pricePortal' interactive={true} elevation={Elevation.FOUR}>
            <div className='pricePortal__chart'>
                <LineChart
                    width={550}
                    height={450}
                    data={spotPrices}
                    margin={{ top: 5, right: 25, left: 30, bottom: 5 }}
                >
                    <Line type="monotone" dataKey="orcaSolUsdtSpotPrice" stroke="#221f20" strokeWidth={4} />
                    <Line type="monotone" dataKey="orcaSolUsdcSpotPrice" stroke="#dd3e3a" strokeWidth={4} />
                    <XAxis stroke="black" />
                    <YAxis stroke="black" domain={['auto', 'auto']} />
                </LineChart>

            </div>
        </Card>
    );
}

export default PricePortal;