import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';

import ListingItem from '../components/ListingItem.jsx';

const ProjectList = ({ projects, editingUser }) => (
  <div style={{width: '100%'}}>
    {
      !projects &&
      <h3>This user has not created any projects</h3>

      ||

      projects &&
      projects.map((content, key) => (
        <ListingItem content={content} key={key} id={key} editingUser={editingUser} />
      ))
    }
  </div>
);

export default ProjectList;
