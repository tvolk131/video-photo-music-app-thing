import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingItem from '../components/ListingItem.jsx';

const SearchResults = ({ searchResults }) => {
  const searchResultsItems = searchResults.map((content, key) => {
    return (
      <ListingItem content={content} key={key} />
    );
  });

  return (
    <div style={{width: '100%'}}>
      {searchResultsItems}
    </div>
  );
};

const mapStateToProps = (state) => state.data;

export default connect(mapStateToProps)(SearchResults);
