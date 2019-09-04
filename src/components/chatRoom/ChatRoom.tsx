import React, { Component, ChangeEvent } from 'react'
import { Container, TextField } from '@material-ui/core'
import IUser from '../../classes/User';
import SendButton from '../sendButton/SendButton';
import ChatWindow from '../chatWindow/ChatWindow';
import uuid from 'uuid/v1';

import './ChatRoom.sass';
import Message, { IMessage } from '../chatWindow/Message';
import Api from '../Api';
import { RouteProps } from 'react-router-dom';

export default class ChatRoom extends Component<IChatRoomProps, IChatRoomState> {
    constructor(props: IChatRoomProps) {
        super(props)
        this.state = {
            newMessage: '',
            roomId: props.roomId,
            messages: new Array<IMessage>(),
            user: props.user,
            notification: ''
        }
        this.getInitialMessages = this.getInitialMessages.bind(this);
    }

    componentDidMount() {
        this.setListeners();
        this.getInitialMessages();
    }

    render() {
        const isDisabledButton = this.state.newMessage.length === 0;
        return (
            <Container className="chat-room" maxWidth="sm">
                <ChatWindow {...this.state} />
                <form action="submit">
                    <TextField placeholder="Enter your message" value={this.state.newMessage} onChange={this.onChangeHandler} className="chat-input" multiline={true} />
                    <SendButton isDisabled={isDisabledButton} onClick={this.onSendMessage} />
                </form>
            </Container >
        );
    }

    onSendMessage = () => {
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
        if (e.target.value.length > 0) {
            Api.EmitEvent<IWritingData>('isWriting', {
                user: this.state.user,
                roomId: this.state.roomId
            })
        }
        // this.setState({
        //     newMessage: e.target.value
        // });
    }

    getInitialMessages() {
        Api.EmitEvent<string>('getInitialMessages', this.state.roomId)
    }

    setListeners = () => {
        Api.socket.on('initialMessagesProvided', (data: IMessage[]) => {
            console.log('initialMessagesProvided')
            this.setState({ messages: data });
        })

        Api.socket.on(`notification-${this.state.roomId}`, (notification: INotificationData): void => {
            if (notification.type === 'isWriting'
                && notification.user
                && notification.user.name !== this.state.user.name) {
                this.setState({
                    notification: `${notification.user.name} is writing a message...`
                })
            }
        })

        Api.socket.on('messageSent', (data: IMessage[]) => {
            this.setState({ messages: data })
        });
    }
}

export interface IChatRoomProps {
    user: IUser,
    roomId: string;
}

export interface IChatRoomState {
    newMessage: string;
    roomId: string;
    messages: IMessage[];
    user: IUser;
    notification: string;
}

export interface IWritingData {
    user: IUser;
    roomId: string;
}

export interface INotificationData {
    type: string;
    user?: IUser;
}
