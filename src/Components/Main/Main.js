import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import InboxIcon from '@material-ui/icons/Inbox';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';


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
        display: 'flex',
        height: '100%',
        borderRight: '1px solid rgba(220, 229, 242, 0.15)',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100%) - ${drawerWidth}px`,
            paddingLeft: drawerWidth,
        },
        background: 'linear-gradient(to right bottom, rgba(26, 51, 90, 1), rgba(40, 69, 114, 1))',
        display: 'flex',
        justifyContent: 'space-around',
    },
    drawerPaper: {
        width: drawerWidth,
        background: 'linear-gradient(to bottom, rgba(26, 51, 90, 1), rgba(40, 69, 114, 1))',
        overflowX: 'hidden'
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
        backgroundColor: '#051D43',
        paddingLeft: '1.1rem',
        borderRadius: '5px',
        width: '100%',
        color: '#3A66AA'
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
        marginTop: 0
    },
    workspace: {
        borderRight: '1px solid rgba(220, 229, 242, 0.15)',
        paddingTop: '7.5em',
        width: '24%',
        display: 'flex',
        justifyContent: 'center',
        
    },
    workspaceItem: {
        height: '3em',
        width: '3em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '7px',
        backgroundColor: '#051D43',
        cursor: 'pointer'
    },
    mainContent: {
        paddingTop: '2.5em'
    },
    accountIcon: {
        height: '2rem',
        width: '2rem'
    },
    searchIcon: {
        marginRight: '0',
        color: '#3A66AA'
    },
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
            <Typography variant='subtitle1' style={{fontSize: '0.95rem', fontWeight: 'lighter'}}># My Space</Typography>
        </div>
    )

    // Defining the structure for the drawer menu
    const drawer = (
        <div className={classes.drawer}>
            <div className={classes.workspace}>
                <div className={classes.workspaceItem}>
                    <AddIcon style={{ height: '1.2em', width: '1.2em', color: '#3A66AA'}} />
                </div>
            </div>
            <div className={classes.mainContent}>
                <List style={{ color: 'white', marginTop: '4em'}}>
                    <ListItem button style={{}}>
                        <ListItemIcon className={classes.menuIconColor}><QuestionAnswerIcon /></ListItemIcon>
                        <ListItemText primary='Threads' />
                    </ListItem >
                    <ListItem button>
                        <ListItemIcon className={classes.menuIconColor}><InboxIcon /></ListItemIcon>
                        <ListItemText primary='All DMs' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.menuIconColor}><AlternateEmailIcon /></ListItemIcon>
                        <ListItemText primary='Mentions' />
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
                            <ListItem button>
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
                            <ListItem button>
                                {userDM}
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
            
        </div>
    );

    return (
        <div>
            <Grid spacing={2}> 
                    <AppBar 
                    className={classes.appBar}
                    elevation={0} 
                    backgroundColor='primary' > 
                        <Toolbar className={classes.toolbar}>
                            <Grid item xs={2}> 
                                <IconButton 
                                className={classes.menuButton}
                                onClick={handleDrawerToggle}>
                                    <MenuIcon style={{color: '#ECF0F1'}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={7}> 
                                <div>
                                    <InputBase
                                    className={classes.input}
                                    placeholder='Search'
                                    startAdornment={
                                        <InputAdornment position='start'>
                                            <SearchIcon className={classes.searchIcon} />
                                        </InputAdornment>
                                    } />
                                </div>
                            </Grid>
                            <Grid 
                            style={{
                                display:'flex', 
                                justifyContent: 'center', 
                                marginLeft: '3em', 
                                alignItems: 'center',
                                cursor: 'pointer'}}
                            item xs={2}> 
                                <AccountCircle className={classes.accountIcon} />
                                <Typography
                                style={{marginLeft: '0.5rem'}} variant='body1'>Miyu T.</Typography>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            <div>
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
                        {drawer}
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
            </div>
        
        
        </div>
    )
}

export default Main