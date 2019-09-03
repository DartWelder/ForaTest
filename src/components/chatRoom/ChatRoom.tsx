import React, { Component, ChangeEvent } from 'react'
import * as Material from '@material-ui/core'
import IUser from '../../classes/User';
import SendButton from '../sendButton/SendButton';
import ChatWindow from '../chatWindow/ChatWindow';
import uuid from 'uuid/v1';

import './ChatRoom.sass';
import Message, { IMessage } from '../chatWindow/Message';
import Api from '../Api';

export default class ChatRoom extends Component<IChatRoomProps, IChatRoomState> {
    constructor(props: IChatRoomProps) {
        super(props)
        this.state = {
            newMessage: '',
            roomId: 'bffeeb00-cdb5-11e9-9923-7d695a3d0b7e',
            messages: new Array<IMessage>(),
            user: props.user
        }
        this.getInitialMessages = this.getInitialMessages.bind(this);
    }

    componentDidMount() {
        this.getInitialMessages();
    }

    render() {
        const isDisabledButton = this.state.newMessage.length === 0;
        return (
            <Material.Container className="chat-room" maxWidth="sm">
                <div className="chat">
                    <ChatWindow messages={this.state.messages} user={this.state.user} />
                </div>
                <form>
                    <Material.TextField placeholder="Enter your message" value={this.state.newMessage} onChange={this.onChangeHandler} className="chat-input" multiline={true} />
                    <SendButton isDisabled={isDisabledButton} onClick={this.onSendMessage} />
                </form>
            </Material.Container>
        );
    }

    onSendMessage = () => {
        Api.socket.on('messageSent', (data: IMessage[]) => {
            this.setState({ messages: data })
        });

        Api.EmitEvent<IMessage>('addMessage', {
            user: this.state.user,
            dateTime: new Date(),
            text: this.state.newMessage,
            id: uuid(),
            roomId: this.state.roomId
        })
        this.setState({ newMessage: '' })
    };

    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newMessage: e.target.value
        });
    }

    getInitialMessages() {
        Api.socket.on('initialMessagesProvided', (data: IMessage[]) => {
            console.log('initialMessagesProvided')
            this.setState({ messages: data });
        })
        Api.EmitEvent<string>('getInitialMessages', this.state.roomId)
    }
}

export interface IChatRoomProps {
    user: IUser
}

export interface IChatRoomState {
    newMessage: string;
    roomId: string;
    messages: IMessage[];
    user: IUser;
}


