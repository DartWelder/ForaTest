import React, { Component, ChangeEvent } from 'react';
import { Container, TextField } from '@material-ui/core';
import IUser from '../../classes/User';
import SendButton from '../sendButton/SendButton';
import ChatWindow from '../chatWindow/ChatWindow';
import uuid from 'uuid/v1';
import './ChatRoom.sass';
import { IMessage } from '../chatWindow/Message';
import Api from '../../classes/Api';
import { Redirect, Link } from 'react-router-dom';
import User from '../../classes/User';
import { Constants, NotificationTypes } from '../../constats';

export default class ChatRoom extends Component<IChatRoomProps, IChatRoomState> {
    constructor(props: IChatRoomProps) {
        super(props)
        this.state = {
            newMessage: '',
            roomId: props.roomId,
            messages: new Array<IMessage>(),
            user: props.user,
            notifications: [],
            roomExist: true
        }
        this.getInitialMessages = this.getInitialMessages.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.setListeners();
        this.getInitialMessages();
        fetch(`${Constants.backEndURL}/getrooms`, { signal: this.abortController.signal })
        // It works, but I don't know - how to handle .json() call witj abort controller.
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    roomExist: data.some((room: string) => {
                        return this.props.roomId === room;
                    })
                })
            })
            .catch((err) => {
                if (err === 'AbortError') return;
                console.log(`Error: ${err}`);
            })
    }    

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const isDisabledButton = this.state.newMessage.length === 0;
        if (!this.state.roomExist) {
            return <Redirect to="/" />
        }
        return (
            <Container className="chat-room" maxWidth="sm">
                <Link to="/" style={{textDecoration: 'none'}}>Go to Chats</Link>
                <ChatWindow {...this.state} />
                <form action="submit">
                    <TextField
                        placeholder="Enter your message"
                        value={this.state.newMessage}
                        onChange={this.onChangeHandler}
                        className="chat-input" />
                    <SendButton isDisabled={isDisabledButton} onClick={this.onSendMessage} />
                </form>
            </Container>
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
        Api.EmitEvent<IWritingData>('writingStopped', {
            user: this.state.user,
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
        } else {
            Api.EmitEvent<IWritingData>('writingStopped', {
                user: this.state.user,
                roomId: this.state.roomId
            })
        }
        this.setState({
            newMessage: e.target.value
        });
    }

    getInitialMessages() {
        Api.EmitEvent<string>('getInitialMessages', this.state.roomId)
    }

    setListeners = () => {
        Api.socket.on('initialMessagesProvided', (data: IMessage[]) => {
            this.setState({ messages: data });
        })
        Api.socket.on(`notification-${this.state.roomId}`, (notification: INotificationData): void => {
            switch (notification.type) {
                case NotificationTypes.isWriting:
                    if (notification.user.name !== this.state.user.name) {
                        const newNotification = {
                            type: notification.type,
                            user: notification.user,
                            text: `${notification.user.name} is writing a message...`
                        }

                        const notifications: INotifications[] = this.state.notifications.filter((n) => {
                            return n.type !== newNotification.type
                                && n.user.userId !== newNotification.user.userId
                        })

                        this.setState({
                            notifications: [...notifications, ...[newNotification]]
                        })

                    }
                    break;
                case NotificationTypes.writingStopped:
                    const notifications: INotifications[] = this.state.notifications.filter((n) => {
                        return !(n.type === 'isWriting'
                            && n.user.userId === notification.user.userId)
                    })

                    this.setState({
                        notifications: notifications
                    })
                    break;
            }

        })

        Api.socket.on('messageSent', (data: IMessage[]) => {
            this.setState({ messages: data })
        })
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
    notifications: INotifications[]
    roomExist: boolean;
}

export interface INotifications {
    type: string;
    user: User;
    text: string;
}

export interface IWritingData {
    user: IUser;
    roomId: string;
}

export interface INotificationData {
    type: string;
    user: IUser;
}
