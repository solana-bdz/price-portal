import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";

import './PricePortal.scss'

function PricePortal() {

    return (
        <Card className='pricePortal' interactive={true} elevation={Elevation.THREE}>
            <h1>Orca DEX Price</h1>
            <h2>SOL: 1</h2>
            <h2>USDC: 94.096</h2>
        </Card>
    );
}

export default PricePortal;