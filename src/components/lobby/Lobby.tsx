import React, { Component } from 'react';
import ChatThumbnail from '../chatThumbnail/ChatThumbnail';
import { Container, Button } from '@material-ui/core';
import './lobby.sass';
import { Constants } from '../../constats';

export default class Lobby extends Component<any, ILobbyState> {
    constructor(props: any) {
        super(props)

        this.state = {
            roomIds: new Array<string>()
        }
    }

    componentDidMount() {
        fetch(`${Constants.backEndURL}/getrooms`)
            .then((res) => res.json())
            .then((data) => {
                this.setRoomsOnState(data)
            })
            .catch((err) => {
                console.log(`Error: ${err}`)
            });
    }

    render() {
        return (
            <Container>
                <h1>Chats</h1>
                {
                    this.state.roomIds.map((id: string) => (
                        <ChatThumbnail key={id} id={id} />
                    ))
                }
                <Button className="add-chat" onClick={this.onAddClickHandler}>Add chat</Button>
            </Container>
        );
    }

    onAddClickHandler = () => {
        fetch(`${Constants.backEndURL}/createroom`, {
            method: 'POST'
        })
            .then((res) => res.json())
            .then((data) => {
                this.setRoomsOnState(data)
            })
            .catch((err) => {
                console.log(`Error: ${err}`)
            });
    }

    setRoomsOnState = (data: string[]) => {
        this.setState({
            roomIds: [...data]
        });
    }
}

export interface ILobbyState {
    roomIds: string[]
}
