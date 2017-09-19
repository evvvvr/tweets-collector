import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { search } from '../../state/actions/search';

import './App.css';

export class App extends Component {
  static propTypes = {
    tweets: PropTypes.array,
    search: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      searchDisabled: true
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch () {
    const query = this.textInput.value;
    this.props.search(query);
  }

  handleChange (e) {
    this.setState({ searchDisabled: !e.target.value });
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  render () {
    const listItems = this.props.tweets.map((tweet) =>
      <div key={tweet.id}>
        <div className='tweet-header'>
          <div>{tweet.user.screenName}</div>
          <div>{moment(tweet.createdAt).format("ddd, MMMM Do YYYY, hh:mm:ss")}</div>
        </div>
        <div className='tweet-text'>
          {tweet.text}
        </div>
      </div>
    );

    return (
      <div className='container'>
        <h1>{'Tweets Collector'}</h1>
        <div>
          <input
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            placeholder='Enter search term'
            type='text'
            ref={(input) => { this.textInput = input }}
          />
          <button
            className='search-button'
            disabled={this.state.searchDisabled}
            onClick={this.state.searchDisabled ? null : this.handleSearch}
          >{'Search'}</button>
        </div>
        {listItems}
      </div>
    );
  }
};

export const mapStateToProps = ({ search }) => {
  return {
    tweets: search.tweets
  };
};

const mapDispatchToProps = {
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
