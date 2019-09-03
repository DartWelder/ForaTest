import React, { Component } from 'react/';

import './App.sass';
import ChatRoom from './components/chatRoom/ChatRoom';
import MeetDialog from './components/MeetDialog';
import IUser from './classes/User';
import uuid from 'uuid';
import User from './classes/User';

class App extends Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: this.getUserFromSessionStorage()
        };
        this.handleClose = this.handleClose.bind(this);
    }
    
    render() {        
        if (!this.state.user.name) {
            return <MeetDialog open={!this.state.user.name} onClose={this.handleClose} selectedValue={this.state.user.name}></MeetDialog>
        }
        return <div>            
            <ChatRoom user={this.state.user}></ChatRoom>            
        </div>;
    };

    getUserFromSessionStorage(): IUser {
        let user = window.sessionStorage.getItem('user');
        const emptyUser = User.GetEmptyObject();

        if (user === null) {
            return emptyUser;
        }
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser;
        } catch (error) {
            return emptyUser;
        }

    }

    handleClose(name: string): void {
        const user = new User({
            name: name,
            userId: this.state.user.userId,
            isCurrentUser: false
        });
        this.setState((prevState) => ({
            user: {...prevState.user , name: name}
        }))
        this.setUserOnSessionStorage(user);
    }
    
    setUserOnSessionStorage(user: IUser): void {
        window.sessionStorage.setItem('user', JSON.stringify(user));
    }
}

export default App;

export interface IAppState {
    user: User
}
