import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";


function Home() {

    return (
        <div className='container__body-home'>
            <div className='container__body-home__box'>
                <div className='container__body-home__box-buttons'>
                    <Link to="/livePriceFeed">
                        <Button large>
                            Live Price Feed
                        </Button>
                    </Link>
                    <Link to="/docs">
                        <Button large>
                            Docs
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;