import React from 'react';

import './Input.css';

export class Input extends React.Component {
    render() {
        const { id, placeHolder } = this.props;
        console.log('input', this.props);
        return (          
            <input className="Input" placeholder={placeHolder} id={id}>
                
            </input>
        );
    }
}
export default Input;