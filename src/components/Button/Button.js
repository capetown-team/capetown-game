import React from 'react';

import './Button.css';

export class Button extends React.Component {
    render() {
        const { onClick, children } = this.props;
        return ( < button className = "Button"
            onClick = { onClick } > { children } <
            /button>
        );
    }
}
export default Button;