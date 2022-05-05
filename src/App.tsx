import React from 'react';
import PricePortal from './components/PricePortal/PricePortal';
import Header from './components/Header/Header';

import './App.scss';

function App() {
    return (
        <div className='container'>
            <div className='container__header'>
                <Header />
            </div>
            <div className='container__body'>
                <div className='container__body-dexs'>
                    <PricePortal />
                </div>

            </div>
            <div className='container__footer'></div>
        </div>

    );
}

export default App;