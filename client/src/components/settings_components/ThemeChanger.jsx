import React, { Component } from 'react';
import { Paper, Typography, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
  menu: {
    width: '100%',
    maxWidth: 360
  },
  button: {
    margin: 10
  }
};

const themeOptions = [
  'Dark',
  'Light',
  'Spiffy'
];

class ThemeChanger extends Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
      menuOpen: false
    };
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.saveTheme = this.saveTheme.bind(this);
  }

  handleClickListItem (event) {
    this.setState({menuOpen: true, anchorEl: event.currentTarget});
  }

  handleMenuItemClick (event, themeIndex) {
    console.log(themeIndex);
    this.setState({selectedIndex: themeIndex, menuOpen: false});
  }

  handleRequestClose () {
    this.setState({ menuOpen: false });
  }

  saveTheme (index) {
    console.log(this.state.selectedIndex);
  }

  render () {
    return (
      <div>
        <Paper style={this.props.style}>
          <Typography type="headline" component="h3">
            Set Theme
          </Typography>
          <List>
            <ListItem
              button
              aria-haspopup='true'
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary='Theme'
                secondary={themeOptions[this.state.selectedIndex]}
              />
            </ListItem>
          </List>
          <Menu
            style={styles.menu}
            open={this.state.menuOpen}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleRequestClose}
          >
            {themeOptions.map((option, index) => (
              <MenuItem
                key={index}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Button style={styles.button} raised onClick={this.saveTheme} color='primary'>
            Save
          </Button>
        </Paper>
      </div>
    );
  }
}

export default ThemeChanger;