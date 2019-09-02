import React from 'react';
import User from "../../interfaces/User.interface";
import { v1String as uuid } from 'uuid/interfaces';

export default class Message extends React.Component<IMessage, IMessageState> {
    constructor(props: IMessageProps) {
        super(props)
    
        this.state = {
            text: props.text
        }
    }
    
    render() {
        return(
            <div>
                <p>{this.state.text}</p>
            </div>);
    }
}


export interface IMessageProps extends IMessage {};

export interface IMessage {    
    user: User;
    dateTime: Date;
    text: string;    
    id: string;
    roomId: string;
};

export interface IMessageState {
    text: string;
}