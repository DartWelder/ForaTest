import React, { Component, ChangeEvent } from 'react';
import {Dialog, DialogTitle, TextField} from '@material-ui/core'; 

 class MeetDialog extends Component<SimpleDialogProps, MeetDialogInterface> { 
    constructor(props: SimpleDialogProps) {
        super(props)
    
        this.state = {
            name: '',
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
           
    render() {        
        // const { onClose, selectedValue, open } = this.props;
        return (
            <Dialog open={this.props.open} onClose={this.handleClose.bind(this)}>
                <DialogTitle id="simple-dialog-title">Please, enter your name</DialogTitle>
                <TextField required value={this.state.name} onChange={this.handleChange}></TextField>
            </Dialog>      
        )
    }

    public handleChange(e: ChangeEvent<HTMLInputElement>) : void {
        this.setState({name: e.target.value})
    }

    public handleClose(): void {
        this.props.onClose(this.state.name);
    }
}

export default MeetDialog;

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

export interface MeetDialogInterface {
    name: string,
    open: boolean
}
