import React from 'react';

import InstaProfileAPI from '../components/ProfileDetails'

class ImageProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      details: [],
      isLoading: false,
      error: null,
    }
  }

  componentWillReceiveProps(props) {

    this.setState({ isLoading: true })
    InstaProfileAPI(this.props.username).then(
      result => this.setState({
        details: result,
        isLoading: false,
      })
    )
  }

  render() {
    const { details, isLoading, error } = this.state

    if (error) {
      return <p>{error.message}</p>
    }

    if (isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <div className="has-text-centered">
      <a href={'https://www.instagram.com/' + details.username + '/'} target="_blank">
        <figure className="image is-inline-block" style={{ width: 250 }}>
          <img className="is-rounded"
               src={details.profile_pic_url_hd}
               alt=""/>
        </figure>
      </a>
        
        
        <div className="title is-3 has-text-primary">@{details.username}</div>
        
      </div>
    )
  }
}

export default ImageProfile