import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../state/actions/search';

export class App extends Component {

  static propTypes = {
    tweets: PropTypes.array,
    search: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.search();
  };

  render() {
    return (
      <div>'Hello'</div>
    );
  };
};

export const mapStateToProps = ({ search }) => {
  return {
    tweets: search.tweets,
  }
};

const mapDispatchToProps = {
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
