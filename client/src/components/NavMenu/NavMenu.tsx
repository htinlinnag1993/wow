import React, {FC} from "react";
import {Link} from "react-router-dom";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';

import {INavMenu} from "../../shared/interfaces";

const renderIcon = (NavMenuIcon) => <NavMenuIcon />;
const navMenuItems = [
  {
    label: "Home",
    link: "/",
    render: () => renderIcon(DashboardIcon),
  },
  {
    label: "Dashboard",
    link: "/dashboard",
    render: () => renderIcon(HomeIcon),
  },
  {
    label: "Profile",
    link: "/profile",
    render: () => renderIcon(PersonIcon),
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 5,
      textAlign: 'center',
      backgroundColor: '#3f51b5',
      color: 'white',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      margin: 12,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

const NavMenu:FC<INavMenu> = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar}>
        <Card className={classes.root}>
          <CardContent>
            <MonetizationOnIcon />
            <Typography variant="h5" component="h2" color="inherit">
              WOW
            </Typography>
          </CardContent>
        </Card>
      </div>
      <List>
        {navMenuItems.map(({label, link, render}, index) => {
          const CustomLink = props => <Link to={link} {...props} />
          return (
            <ListItem button key={label} component={CustomLink}>
              <ListItemIcon>{render()}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
};

export {NavMenu};