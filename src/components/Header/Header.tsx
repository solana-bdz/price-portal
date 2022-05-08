import React from 'react';

import './Header.scss'

type Props = {
    title: string;
}

function Header(props: Props) {
    const { title } = props;
    return (
        <div className='header'>
            <span className='header__text'>{title}</span>
        </div>
    );
}

export default Header;