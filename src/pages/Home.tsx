import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";


type Props = {
    setActivePage: any;
}

function Home(props: Props) {
    const { setActivePage } = props;

    return (
        <div className='container__body-home'>
            <div className='container__body-home__hero'>
                <img
                    src={require('../static/images/solana-bdz.jpeg')}
                    style={{ maxHeight: '35em' }}
                />
            </div>
            <div className='container__body-home__buttons'>
                <Link to="/livePriceFeed">
                    <Button large onClick={() => setActivePage('Live Price Feed')}>
                        Live Price Feed
                    </Button>
                </Link>
                <Link to="/docs">
                    <Button large onClick={() => setActivePage('Docs')}>
                        Docs
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;