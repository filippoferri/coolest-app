import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../actions'
import Link from 'gatsby-link'

import SingleBidder from '../components/SingleBidder'

class history extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchBidders()
  }

  reverseObject(object) {
    var newObject = {}
    var keys = []

    for (var key in object) {
      keys.push(key)
    }

    for (var i = keys.length - 1; i >= 0; i--) {
      var value = object[keys[i]]
      newObject[keys[i]] = value
    }

    return newObject
  }

  renderBidders() {

    const { data } = this.props

    const newData = this.reverseObject(data)

    const bidders = _.map(newData, (value, key) => {
      return <SingleBidder key={key} bidderId={key} bidder={value}/>
    })

    if (!_.isEmpty(bidders)) {
      return bidders
    }
    return (
      <div className="has-text-centered">vuoto </div>
    )
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-6-desktop is-offset-3-desktop">
              {this.renderBidders()}
            </div>
          </div>
        </div>
      </section>
    )
  }

}

const mapStateToProps = ({ data }) => {
  return {
    data,
  }
}

export default connect(mapStateToProps, actions)(history)