import React, { Component, createRef } from 'react';
import Message, { IMessage } from './Message';
import * as Material from '@material-ui/core';
import './chatWindow.sass';
import IUser from '../../classes/User';
import { INotifications } from '../chatRoom/ChatRoom';
import uuid from 'uuid';

class ChatWindow extends Component<IChatWindowProps, {}> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    public messagesEndRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        return (
            <div className="chat">
                <Material.Container maxWidth="sm" >
                    {this.props.messages.map((message) => {
                        message.currentUser = this.props.user;
                        return (<Message key={message.id} {...message} />);
                    })}
                    <div className="bottom">
                        {!!this.props.notifications && this.props.notifications.map((n: INotifications) => (
                            <div key={uuid()} >
                                <span className="notification">{n.text}</span><br />
                            </div>
                        ))}
                    </div>
                </Material.Container>
                <div className="bottom" ref={this.messagesEndRef} />
            </div>
        );
    }

    scrollToBottom = (): void => {
        this.messagesEndRef.current
            && this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}

export default ChatWindow;

export interface IChatWindowProps {
    messages: IMessage[];
    user: IUser;
    notifications?: INotifications[];
};