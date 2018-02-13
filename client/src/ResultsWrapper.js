import React, { Component } from 'react';

class ResultsWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tracks: []
    }
  }

  componentDidMount() {
    this.fetchTracks(this.props.subreddit)
      .then((res) => {
        this.setState({isLoaded: true, tracks: res});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchTracks = (sub) => {
    return fetch(`/api/r/${sub}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
    })
    .then(res => res.json())
    .catch((e) => {
      console.error(e);
    });
  }

  render() {
    const { isLoaded, tracks } = this.state;

    const trackList = tracks.map((t) =>
      <li>
        {t.artists.join(', ')} - {t.name}
      </li>
    )
    return (
      <div>
        {
        !isLoaded &&
          <h1>LOADING</h1>
        }
        <ul>{trackList}</ul>
      </div>
    )
  }

}

export default ResultsWrapper;