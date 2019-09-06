import React, { Component, createRef } from 'react';
import Message, { IMessage } from './Message';
import * as Material from '@material-ui/core';
import './chatWindow.sass';
import IUser from '../../classes/User';
import { INotifications } from '../chatRoom/ChatRoom';

class ChatWindow extends Component<IChatWindowProps, {}> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    public messagesEndRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    componentWillMount() {
        this.scrollToBottom();
    }

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
                    {this.props.messages.map((message, i) => {
                        message.currentUser = this.props.user;
                        return (<Message key={message.id} {...message} />);
                    })}
                    {!!this.props.notifications && this.props.notifications.map((n: INotifications) => (
                        <span className="notification bottom">{n.text}</span>
                    ))}
                </Material.Container>                
                <div className="bottom" ref={this.messagesEndRef}/>
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