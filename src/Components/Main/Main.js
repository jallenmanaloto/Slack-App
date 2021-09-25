import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import InboxIcon from '@material-ui/icons/Inbox';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 325;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw'
    },
    drawer:  {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100%) - ${drawerWidth}px`,
            paddingLeft: drawerWidth,
        },
        background: '#324A5F',
        display: 'flex',
        justifyContent: 'space-around'
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#324A5F' 
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuBarText: { 
        color: 'white',
        fontSize: '1.8rem'
    },
    menuBarTitle: { 
        color: '#F9F3F3',
        fontWeight: '600',
        marginTop: '3em',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2rem'
    },
    createIcon: {
        color: '#324A5F'
    },
    menuIconColor: {
        color: 'white',
        marginLeft: '1rem'
    },
    input: {
        background: '#CCC9DC',
        paddingLeft: '0.5rem'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    accountIcon: {
        height: '2.2rem',
        width: '2.2rem',
        marginRight: '2.5em'
    },
    subMessages: {
        marginLeft: '4.5em',
        marginTop: '-1.2rem',
    }
}));

const Main = () => {

    const classes = useStyles();

    //Setting states
    const [mobileOpen, setMobileOpen] = useState(false)
    const [channelExpand, setChannelExpand] = useState(false)
    const [dmExpand, setDmExpand] = useState(false)

    //Function to handle expansion of Channel
    const handleChannelExpandToggle = () => {
        setChannelExpand(!channelExpand)
    }
    //Function to handle expansion of Direct Messages
    const handleDmExpandToggle = () => {
        setDmExpand(!dmExpand)
    }

    //Function to handle toggle of side menu bar on mobile screensize
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const userDM = (
        <div className={classes.subMessages}>
            <Typography variant='subtitle1' style={{fontSize: '0.95rem', fontWeight: 'lighter'}}>Sample User</Typography>
        </div>
    )

    const channelList = (
        <div className={classes.subMessages}>
            <Typography variant='subtitle1' style={{fontSize: '0.95rem', fontWeight: 'lighter'}}># Sample</Typography>
            <Typography variant='subtitle1' style={{fontSize: '0.95rem', fontWeight: 'lighter'}}># Sample</Typography>
        </div>
    )

    //Defining the structure for the drawer menu
    const drawer = (
        <div>
            <div className={classes.menuBarTitle}>
                <Typography style={{fontSize: '2em'}}  variant='h5'> 
                    Avion School
                </Typography>
                <div 
                style={{
                    backgroundColor: 'white', 
                    borderRadius: '5px',
                    width: '1.9rem',
                    height: '1.9rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginLeft: '1.5rem'}}>
                    <CreateIcon className={classes.createIcon}/>
                </div>
                
            </div>
            <Divider />
            <List style={{ color: 'white', marginTop: '4em'}}>
                <ListItem button >
                    <ListItemIcon className={classes.menuIconColor}><QuestionAnswerIcon /></ListItemIcon>
                    <ListItemText primary='Threads' />
                </ListItem >
                <ListItem button>
                    <ListItemIcon className={classes.menuIconColor}><InboxIcon /></ListItemIcon>
                    <ListItemText primary='All DMs' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon className={classes.menuIconColor}><AlternateEmailIcon /></ListItemIcon>
                    <ListItemText primary='Mentions & Reactions' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon className={classes.menuIconColor}><MoreHorizIcon /></ListItemIcon>
                    <ListItemText primary='More' />
                </ListItem>
                <ListItem onClick={handleChannelExpandToggle} button>
                    <ListItemIcon
                    className={classes.menuIconColor}
                     >
                       {channelExpand ? <ExpandMore /> : <ChevronRightIcon />}  
                    </ListItemIcon>
                    <ListItemText primary='Channels' />
                </ListItem>
                <Collapse in={channelExpand} timeout='auto' unmountOnExit>
                    <List>
                        <ListItem>
                            {channelList}
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem onClick={handleDmExpandToggle} button>
                    <ListItemIcon 
                    className={classes.menuIconColor}
                    >
                        {dmExpand ? <ExpandMore /> : <ChevronRightIcon />}  
                    </ListItemIcon>
                    <ListItemText primary='Direct Messages' />
                </ListItem>
                <Collapse in={dmExpand} timeout='auto' unmountOnExit>
                    <List>
                        <ListItem>
                            {userDM}
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar 
                className={classes.appBar} 
                position='fixed'
                elevation='0'
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                        edge='start'
                        className={classes.menuButton}
                        onClick={handleDrawerToggle}>
                           
                            <MenuIcon className={classes.menuIconColor} />
                        </IconButton>
                        <Typography variant='h4'>My Space</Typography>
                        <Badge badgeContent={0} color='secondary'>
                            <AccountCircleIcon className={classes.accountIcon} />
                        </Badge>
                    </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="temporary"
                    anchor="left"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    >
                        {channelList}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default Main
