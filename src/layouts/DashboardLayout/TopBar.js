import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
