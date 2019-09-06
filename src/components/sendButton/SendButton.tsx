import React from 'react'
import './SendButton.sass'

import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

export default function SendButton(props: ISendButtonProps) {
    return (
        <Button 
            disabled={props.isDisabled} 
            onClick={props.onClick} 
            variant="contained" 
            color="primary" 
            className="send-button"
        > Send            
            <SendIcon className="send-button-icon"></SendIcon>
        </Button>
    )
}

export interface ISendButtonProps {
    onClick: () => void;
    isDisabled: boolean;
}
