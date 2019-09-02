import React, { MouseEventHandler } from 'react'
import './SendButton.sass';

import * as Material from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { ButtonBaseActions } from '@material-ui/core/ButtonBase';

export default class SendButton extends React.Component<SendButtonProps> {
    render() {
        const props: SendButtonProps = this.props;
        return (
            <Material.Button onClick={props.onClick} variant="contained" color="primary" className="send-button">
                Send
                <SendIcon className="send-button-icon"></SendIcon>
            </Material.Button>
            // <Material.Button color="default" className="chat-button">
            //     SEND <SendIcon fontSize="small" className="send-button-icon"/> 
            // </Material.Button>
        )
    }
}

export interface SendButtonProps {
    onClick: () => void
}
