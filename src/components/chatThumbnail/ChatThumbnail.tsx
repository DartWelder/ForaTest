import React from 'react';
import { Card, CardHeader, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
                    <Fab component={Link} to={`/chat/${props.id}`}>
                        <EditIcon />
                    </Fab>
                }
            />
        </Card>
    );
}

export interface IChatThumbnailProps {
    id: string;
}
