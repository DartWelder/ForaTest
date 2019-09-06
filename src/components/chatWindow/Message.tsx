import React from 'react';
import IUser from '../../classes/User';
import { Avatar, Card, CardHeader } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import User from '../../classes/User';

export default function Message(props: IMessageProps) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            card: {
                width: '80%',
                float: 'left',
                marginTop: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff'
            },
            currentCard: {
                width: '80%',
                float: 'right',
                marginTop: '10px'
            },
            avatar: {
                backgroundColor: red[500],
            },
        }),
    );

    const classes = useStyles();
    const currentUserId: string = props.currentUser === undefined ? '' : props.currentUser.userId;
    return (
        <Card className={props.user.userId ===  currentUserId ? classes.currentCard: classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.user.name[0]}
                    </Avatar>
                }
                title={props.user.name}
                subheader={props.text}
                action={new Date(props.dateTime).toLocaleTimeString()}
            />
        </Card>
    );
}

export interface IMessageProps extends IMessage {
};

export interface IMessage {
    currentUser?: User;
    user: IUser;
    dateTime: Date;
    text: string;
    id: string;
    roomId: string;
};