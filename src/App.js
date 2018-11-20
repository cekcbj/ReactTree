import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Modal from '@material-ui/core/Modal';
import * as _ from 'ramda';
import TextFields from './TextFields'



const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


function node(name, children, isOpen, nodeType) {
  console.log(name);
}

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick  = this.handleClick.bind(this);
    this.handleClose  = this.handleClose.bind(this);
  }

  state = {
    auth: true,
    anchorEl: null,
    isModalOpen: false,
    cb: () => '',
    tree: {
      root: node (
        "sandbox",
        [
          node( "react.js", [], false, '__FILE'),
          node(
            "Examples",
            [
              node( "index.js", [], false, '__FILE'),
              node( "main.js", [], false, '__FILE'),
              node(
                "channels",
                [
                  node( "main.js", [], false, '__FILE')
                ],
                false,
                '__DIRECTORY'
              ),
            ],
            true,
            '__DIRECTORY'
          ),
        ],
        false,
        '__DIRECTORY'
      )
    },
  };


  handleClose() {
    this.setState({
      isModalOpen: false,
    })
  }


  handleClick() {
    console.log("clicked em");
    console.log(_.isEmpty(this.state.tree))
    this.setState({
      isModalOpen: true
    })
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const shouldCreateProject = _.isEmpty(this.state.tree)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              React Tree
            </Typography>
          </Toolbar>
        </AppBar>
        <Button
          variant="contained"
          style={{color: purple[300]}}
          className={classes.button}
          onClick={this.handleClick}
        >
          {shouldCreateProject ? 'Add Project' : 'AddFolder'}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isModalOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
              <TextFields />
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
        {for children of tree.root }
        <List component="nav">
          <ListItem button>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles(theme))(MenuAppBar)
