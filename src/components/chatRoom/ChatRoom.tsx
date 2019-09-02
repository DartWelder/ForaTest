import React, { Component, ChangeEvent } from 'react'
import * as Material from '@material-ui/core'
import User from '../../interfaces/User.interface';
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
            roomId: uuid(),
            messages: new Array<IMessage>(),
            user: props.user
        }
    }

    componentWillReceiveProps() {
        this.getInitialMessages();
    }

    render() {        
        const isDisabledButton = this.state.newMessage.length === 0;
        return (
            <Material.Container className="chat-room" maxWidth="sm">
                <div className="chat">
                    <ChatWindow messages={this.state.messages}/>  
                </div>
                <form action="send">
                    <Material.TextField placeholder="Enter your message" value={this.state.newMessage} onChange={this.onChangeHandler} className="chat-input" multiline={true} />
                    <SendButton isDisabled={isDisabledButton} onClick={this.onSendMessage}/>
                </form>
            </Material.Container>
        );
    }

    onSendMessage = () => {      
        // this.Messages.push({
        //     user: {name: 'Darth'},
        //     dateTime: new Date(),
        //     text: this.state.newMessage,
        //     id: uuid()
        // })
        Api.EmitEvent<IMessage>('addMessage', {
            user: {name: 'Darth'},
            dateTime: new Date(),
            text: this.state.newMessage,
            id: uuid(),
            roomId: this.state.roomId
        })
        this.setState({ newMessage: ''})
    };
    
    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newMessage: e.target.value
        });
    }

    getInitialMessages() {
        Api.socket.on('initialMessagesProvided', (data: IMessage[]) => {
            console.log('initialMessagesProvided')
            this.setState({messages: data});
        })
        Api.EmitEvent('getInitialMessages', this.state.roomId)
    }
}

export interface IChatRoomProps {
    user: User
}

export interface IChatRoomState {
    newMessage: string;
    roomId: string;
    messages: IMessage[];
    user: User;
}


