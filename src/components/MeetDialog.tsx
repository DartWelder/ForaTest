import React, { Component, ChangeEvent } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

class MeetDialog extends Component<ISimpleDialogProps, IMeetDialogInterface> {
    constructor(props: ISimpleDialogProps) {
        super(props)

        this.state = {
            name: '',
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Hello</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, enter your name
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    public handleChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({ name: e.target.value });
    }

    public handleClose(): void {
        this.props.onClose(this.state.name);
    }
}

export default MeetDialog;

export interface ISimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export interface IMeetDialogInterface {
    name: string,
    open: boolean
}
