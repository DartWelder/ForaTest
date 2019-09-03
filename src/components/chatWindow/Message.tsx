import React from 'react';
import IUser from '../../classes/User';
import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import User from '../../classes/User';

export default function Message(props: IMessageProps) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            card: {
                width: '80%',
                float: 'left',
                marginTop: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)'
            },
            currentCard: {
                width: '80%',
                float: 'right',
                marginTop: '10px'
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            },
            expand: {
                transform: 'rotate(0deg)',
                marginLeft: 'auto',
                transition: theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shortest,
                }),
            },
            expandOpen: {
                transform: 'rotate(180deg)',
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
                action={ 
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.user.name}
                subheader={props.text}
            />
        </Card>
        // <div>
        //     <span>this.state.user.</span><p>{this.state.text}</p>
        // </div>
    );
    }


export interface IMessageProps extends IMessage { };

export interface IMessage {
    currentUser?: User;
    user: IUser;
    dateTime: Date;
    text: string;
    id: string;
    roomId: string;
};