import React from 'react';

import './Button.scss';
interface ButtonProps
{
    children: string;
}

export function Button(props: ButtonProps) {
    const { children } = props;
    return (
        <React.Fragment>
        <button className = "button">
            { children } 
            </button>
        </React.Fragment>
    )
}
