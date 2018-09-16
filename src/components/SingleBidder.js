import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeBidder } from '../actions'

class SingleBidder extends Component {

  handleCompleteClick = removeBidderId => {
    const { removeBidder } = this.props
    removeBidder(removeBidderId)
  }

  render() {

    const { bidderId, bidder } = this.props

    return (
      <div key="toDoName" className="notification">

        <div className="is-flex">

          <div style={{width: '50%'}}>
            {bidder.username}{' - Bid: '}
            {bidder.amount} {' USD'}
          </div>

          <div className="has-text-right" style={{width: '50%'}}>
            <button
              type="button"
              onClick={() => this.handleCompleteClick(bidderId)}
              className="button is-danger"
            >Rimuovi
            </button>
          </div>

        </div>


      </div>
    )
  }
}

export default connect(null, { removeBidder })(SingleBidder)