import React, { Component } from 'react/';

import './App.sass';
import MeetDialog from './components/MeetDialog';
import IUser from './classes/User';
import User from './classes/User';
import { Route, BrowserRouter } from 'react-router-dom';
import SessionService from './components/SessionService';
import routes from './routes';
import { Container } from '@material-ui/core';

export default class App extends Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: this.getUserFromSessionStorage()
        };
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        if (!this.state.user.name) {
            return (
                <MeetDialog
                    open={!this.state.user.name}
                    onClose={this.handleClose}
                    selectedValue={this.state.user.name}
                />);
        }
        return (
            <Container className="chat-container">
                <BrowserRouter>
                    {routes.map(({ path, component: C, exact }, i) => {
                        return (
                            <Route
                                key={i}
                                path={path}
                                exact={exact}
                                render={(props) => <C user={this.state.user} roomId={props.match.params.id} />}
                            />
                        )
                    })}
                </BrowserRouter>
            </Container>
        );
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
            user: { ...prevState.user, name: name }
        }));
        SessionService.SetItem('user', JSON.stringify(user));
    }
}

export interface IAppState {
    user: User
}
