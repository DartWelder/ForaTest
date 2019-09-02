import React, { Component } from 'react/';

import './App.sass';
import ChatRoom from './components/chatRoom/ChatRoom';
import MeetDialog from './components/MeetDialog';

class App extends Component<any, AppStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            userName: App.getUserFromLocalStorage()
        };
        this.handleClose = this.handleClose.bind(this);
        // this.user = App.getUserFromLocalStorage();
        // this.setState({openDialog: !this.user.name});
    }
    
    render() {        
        if (!this.state.userName) {
            return <MeetDialog open={!this.state.userName} onClose={this.handleClose} selectedValue={this.state.userName}></MeetDialog>
        }
        return <div>            
            <ChatRoom user={{name: this.state.userName}}></ChatRoom>            
        </div>;
    };

    static getUserFromLocalStorage(): string {
        let name = window.localStorage.getItem('Username');
        return name || ''
    }

    public handleClose(name: string): void {
        console.log(name)
        this.setState({ userName: name });
        this.setNameOnLocalStorage(name);
    }
    /**
     * setNameOnLocalStorage
     */
    public setNameOnLocalStorage(name: string): void {
        window.localStorage.setItem('Username', name);
    }
}

export default App;

export interface AppStateInterface {
    userName: string
}
