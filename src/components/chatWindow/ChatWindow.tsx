import React, { Component, createRef } from 'react'
import Message, { IMessage } from './Message';
import * as Material from '@material-ui/core';
import './chatWindow.sass';
import IUser from '../../classes/User';
import Api from '../Api';

class ChatWindow extends Component<IChatWindowProps, {}> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    public messagesEndRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
    
    componentWillMount() {
        this.scrollToBottom()
    }
    
    componentDidMount() {
        this.scrollToBottom()
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    render() {
        return (
            <div className="chat">
                <Material.Container maxWidth="sm" >
                    {this.props.messages.map((message, i) => {
                        message.currentUser = this.props.user;
                        return (<Message key={message.id} {...message} />)
                    })}
                </Material.Container>                
                <div className="bottom" ref={this.messagesEndRef}>
                    {this.props.notification && (<span className="notification">{this.props.notification}</span>)}
                </div>
            </div>
        )
    }

    scrollToBottom = (): void => {
        this.messagesEndRef.current && this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
}

export default ChatWindow;

export interface IChatWindowProps {
    messages: IMessage[];
    user: IUser;
    notification?: string;
};