import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingItem from '../components/ListingItem.jsx';
import Upload from '../components/Upload.jsx';

const SearchResults = ({ searchResults }) => (
  <div style={{width: '100%'}}>{
    searchResults.map((content, key) => (
      <ListingItem content={content} key={key} id={key} />
    ))
  }</div>
);

const mapStateToProps = (state) => state.data;

export default connect(mapStateToProps)(SearchResults);
