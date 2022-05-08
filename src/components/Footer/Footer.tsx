import React from 'react';

import { Card, Elevation } from "@blueprintjs/core";

import { SpotPrices } from '../../models/tokenPairs.models';

import './Footer.scss'


type Props = {
    currentSpotPrice: SpotPrices;
}

function Footer(props: Props) {
    const { currentSpotPrice } = props;

    return (
        <Card className='footer' interactive={true} elevation={Elevation.FOUR}>
            <h3 style={{ color: "#4ecead" }}>Orca SOL x USDT: ${currentSpotPrice.orcaSolUsdtSpotPrice}</h3>
            <h3 style={{ color: "#7dcbeb" }}>Orca SOL x USDC: ${currentSpotPrice.orcaSolUsdcSpotPrice}</h3>
        </Card>
    );
}

export default Footer;