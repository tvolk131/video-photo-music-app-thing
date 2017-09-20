import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import ListingItem from '../components/ListingItem.jsx';

const SearchResults = ({ results }) => (
  <Paper style={{width: '100%'}}>{
    results.map((result, key) => (
      <ListingItem content={result._source} key={key} id={key} />
    ))
  }</Paper>
);

const mapStateToProps = (state) => ({results: state.search.results});

export default connect(mapStateToProps)(SearchResults);
