import React, { Component } from 'react/';

import './App.sass';
import ChatRoom, { IChatRoomProps } from './components/chatRoom/ChatRoom';
import MeetDialog from './components/MeetDialog';
import IUser from './classes/User';
import User from './classes/User';
import { Route, BrowserRouter, RouteProps, Redirect } from 'react-router-dom';
import SessionService from './components/SessionService';
import routes from './routes';

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
        return (
            <BrowserRouter>
                {routes.map(({path, component: C, exact})=> {
                    return (
                        <Route
                            path={path}
                            exact={exact}
                            render={(props)=> <C user={this.state.user} roomId={props.match.params.id}/>}
                        />   
                    )
                })}
                {/* <Route
                    path="/"
                    exact
                    render={(props)=> <ChatRoom user={this.state.user} roomId={props.match.params.id}/>}
                />     
                <Route
                    path="/chat/:id"
                    render={(props)=> <ChatRoom user={this.state.user} roomId={props.match.params.id}/>}
                />            */}
                {/* <ChatRoom user={this.state.user}></ChatRoom>             */}
            </BrowserRouter>
        )
    };

    getUserFromSessionStorage(): IUser {
        let user = SessionService.GetItem<IUser>('user');
        const emptyUser = User.GetEmptyObject();

        if (user === null) {
            return emptyUser;
        }
        return user;
    }

    handleClose(name: string): void {
        const user = new User({
            name: name,
            userId: this.state.user.userId,
            isCurrentUser: false
        });
        this.setState((prevState) => ({
            user: {...prevState.user , name: name}
        }));
        SessionService.SetItem('user', JSON.stringify(user));
    }
}

export default App;

export interface IAppState {
    user: User
}
