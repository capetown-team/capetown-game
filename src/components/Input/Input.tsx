import React from 'react';

import './Input.scss';

interface InputProps {
    id?: string;
    placeHolder?: string;
  }
 
interface InputState {
}

export class Input extends React.Component<InputProps, InputState> {
    render() {
        const { id, placeHolder } = this.props;
        console.log('input', this.props);
        return (         
            <input className="Input" placeholder={placeHolder} id={id}>
                
            </input>
        );
    }
}