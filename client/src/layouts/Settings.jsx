import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import PasswordChanger from '../components/settings_components/PasswordChanger.jsx';
import ThemeChanger from '../components/settings_components/ThemeChanger.jsx';

const styles = {
  wrapper: {
    maxWidth: '800px',
    margin: 'auto'
  },
  button: {
    margin: 10
  },
  section: {
    marginBottom: 15
  }
};

const propTypes = {
  setTheme: PropTypes.func.isRequired
};

const Settings = ({ setTheme }) => (
  <div style={styles.wrapper}>
    <h2>Settings</h2>
    <div style={styles.section}>
      <PasswordChanger />
    </div>
    <div style={styles.section}>
      <ThemeChanger
        setTheme={setTheme}
      />
    </div>
  </div>
);

const setTheme = gql`
  mutation editUser($themeId: Int!) {
    editUser(theme: $themeId) {
      theme
    }
  }
`;

Settings.propTypes = propTypes;

export default graphql(setTheme, {
  props: ({ ownProps, mutate }) => ({
    setTheme(themeId) {
      mutate({variables: {themeId}});
    }
  })
})(Settings);