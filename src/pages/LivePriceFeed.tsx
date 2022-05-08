import React from 'react';

import PricePortal from '../components/PricePortal/PricePortal';

import { SpotPrices } from '../models/models';


type Props = {
    spotPrices: SpotPrices[];
    currentSpotPrice: SpotPrices;
}

function LiveDataFeed(props: Props) {
    const { spotPrices, currentSpotPrice } = props;

    return (
        <div className='container__body-dexs'>
            <PricePortal
                spotPrices={spotPrices}
                currentSpotPrice={currentSpotPrice}
            />
        </div>
    );
}

export default LiveDataFeed;