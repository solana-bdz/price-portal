import React from 'react';
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
                    <Line type="monotone" dataKey="orcaSolUsdtSpotPrice" stroke="#4ecead" strokeWidth={4} />
                    <Line type="monotone" dataKey="orcaSolUsdcSpotPrice" stroke="#7dcbeb" strokeWidth={4} />
                    <XAxis stroke="white" />
                    <YAxis stroke="white" domain={['auto', 'auto']} />
                </LineChart>

            </div>
        </Card>
    );
}

export default PricePortal;