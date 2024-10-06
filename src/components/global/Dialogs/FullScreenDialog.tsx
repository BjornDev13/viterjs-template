import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps = {
    open: boolean;
    setOpen: (state: boolean) => void;
    title: string,
    children: JSX.Element
}
export default function FullScreenDialog({open, setOpen, title, children}: FullScreenDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          '.MuiDialog-paper': {
            background: '#F4F5FA'
          }
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar
            sx={{
                background: '#5D87FF'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        { children }
      </Dialog>
  );
}
