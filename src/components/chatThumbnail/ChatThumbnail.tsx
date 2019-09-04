import React, { Component, MouseEventHandler } from 'react'
import { Card, CardHeader, IconButton } from '@material-ui/core'
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './chatThumbnail.sass'


export default class ChatThumbnail extends Component<ChatThumbnailProps, ChatThumbnailState> {
    constructor(props: ChatThumbnailProps) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        const id = this.props.id
        return (            
                <Card className="thumbnail">
                    <CardHeader
                        title={`Chat #${id}`}
                        subheader="ssss"
                        action={
                            <Link to={`/chat/${this.props.id}`}>
                                <InsertCommentIcon />
                            </Link>
                        }
                    >
                    </CardHeader>
                </Card>)
    }
}

export interface ChatThumbnailProps {
    id: string;
}

export interface ChatThumbnailState {
    redirect: boolean;
}
