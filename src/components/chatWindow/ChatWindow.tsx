import React, { Component } from 'react'
import Message, { IMessage } from './Message';
import * as Material from '@material-ui/core';
import './chatWindow.sass';

class ChatWindow extends Component<IChatWindowProps, {}> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
    }
    
    render() {
        return (
            <Material.Container maxWidth="sm" >
                    {this.props.messages.map((message) => {
                        return (<Message {...message}/>)
                    })}
            </Material.Container>
        )
    }
}

export default ChatWindow;

export interface IChatWindowProps {
    messages: IMessage[]
};