import React, { Component } from 'react'
import * as Material from '@material-ui/core'
import User from '../interfaces/User.interface';
import SendButton from '../components/sendButton/SendButton';
import ChatWindow from '../components/ChatWindow';

import './ChatRoom.sass';

export default class ChatRoom extends Component<ChatRoomProps> {
    constructor(props: ChatRoomProps) {
        super(props)

        this.state = {

        }
        this.user = props.user;
    }

    public Messages: string[] = new Array<string>();

    private SendMessage () {
        console.log('>>>>>>>>>>', 'click!');
    };

    private user: User;

    render() {
        return (
            <Material.Container maxWidth="sm">
                <ChatWindow />
                <Material.Container maxWidth="sm" />
                <form action="send">
                    <Material.TextField className="chat-input" multiline={true} />
                    <SendButton onClick={this.SendMessage}/>
                </form>
            </Material.Container>
        )
    }
}

export interface ChatRoomProps {
    user: User
}
