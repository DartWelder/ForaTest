import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ChatThumbnail from '../chatThumbnail/ChatThumbnail'
import { Container, Button } from '@material-ui/core'
import './lobby.sass'

export default class Lobby extends Component<any, ILobbyState> {
    constructor(props: any) {
        super(props)
    
        this.state = {
            roomIds: new Array<string>()
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/getrooms')
            .then((res)=> res.json())
            .then((data) => {
                this.setRoomsOnState(data)
            })
    }
    
    render() {
        return (
            <Container>
                <h1>Chats</h1>
                {
                    this.state.roomIds.map((id: string)=> (
                        <ChatThumbnail id={id}/>                     
                    ))
                }                
                <Button className="add-chat" onClick={this.onAddClickHandler}>Add chat</Button>
            </Container>
        )
    }

    onAddClickHandler = () => {
        fetch('http://localhost:3001/createroom')
        .then((res)=> res.json())
            .then((data) => {
                this.setRoomsOnState(data)
            })
    }

    setRoomsOnState = (data: string[]) => {
        this.setState((prevState) => ({
            roomIds: [...data]
        }));
    }
}

export interface ILobbyState {
    roomIds: string[]
}
