import React from 'react';

import './Button.scss';

export class Button extends React.Component {
    render() {
        const { children } = this.props;
        return ( <button className = "Button">
             { children } 
             </button>
        );
    }
}
