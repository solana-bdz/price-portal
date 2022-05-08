import React from 'react';

import PricePortal from '../components/PricePortal/PricePortal';

import { PriceAnalysis } from '../models/models';


type Props = {
    priceAnalysis: PriceAnalysis[];
    currentPriceAnalysis: PriceAnalysis;
}

function LiveDataFeed(props: Props) {
    const { priceAnalysis, currentPriceAnalysis } = props;

    return (
        <div className='container__body-dexs'>
            <PricePortal
                priceAnalysis={priceAnalysis}
                currentPriceAnalysis={currentPriceAnalysis}
            />
        </div>
    );
}

export default LiveDataFeed;