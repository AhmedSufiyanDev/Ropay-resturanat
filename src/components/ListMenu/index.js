import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const NestedList = (props) => {
    const { nestedListItems, setOpenModalProfile,handleUserProfileOpenModal } = props;
    console.log(props);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleListButton = (index) => {
        console.log(index);
        if (index === 4) {
            props.handleLogout()
            setOpenModalProfile(false);
        }
        else if (index === 1) {
            handleUserProfileOpenModal();
            }
    }

    return (
        <>
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
                {nestedListItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem button onClick={item.nestedItems ? handleClick : null}>
                            <ListItemIcon><img src={item.icon} /></ListItemIcon>
                            <ListItemText primary={item.text} onClick={() => handleListButton(index)} />
                            {item.nestedItems && (open ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        {item.nestedItems && (
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.nestedItems.map((nestedItem, nestedIndex) => (
                                        <ListItem
                                            button
                                            key={nestedIndex}
                                            className={classes.nested}
                                        >
                                            <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                                            <ListItemText primary={nestedItem.text} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </>
    );
};

export default NestedList;
