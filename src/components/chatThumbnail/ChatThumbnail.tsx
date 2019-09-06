import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Link } from 'react-router-dom';
import './chatThumbnail.sass';


export default function ChatThumbnail(props: IChatThumbnailProps) {
    const id = props.id
    return (
        <Card className="thumbnail">
            <CardHeader
                title={`Chat #${id}`}
                subheader="ssss"
                action={
                    <Link to={`/chat/${props.id}`}>
                        <InsertCommentIcon />
                    </Link>
                }
            />
        </Card>
    );
}

export interface IChatThumbnailProps {
    id: string;
}
