import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import SearchResults from '../containers/SearchResults.jsx';

class Search extends Component {
  render() {
    return (
      <div style={{padding: '2%'}}>
        <SearchResults />   
      </div>
    );
  }
}

export default Search;