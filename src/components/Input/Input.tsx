import React from 'react';

import './Input.scss';

interface InputProps {
    id?: string;
    placeHolder?: string;
    children?: string | never[];
  }
 
export function Input(props: InputProps) {
    const { id, placeHolder } = props;
        
    return (         
        <React.Fragment>
            <input className="input" placeholder={placeHolder} id={id}>        
            </input>
        </React.Fragment>        
    )
}