import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Modal({ open, title, content, action }) {
    return (
        <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"md"}
        disableBackdropClick={true}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{action}</DialogActions>
        </Dialog>
    )
}