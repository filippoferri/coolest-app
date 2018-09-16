import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../actions'
import SingleBidder from './SingleBidder'

class BidderList extends Component {

  state = {
    addInstaName: '',
    addAmount: '',
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value })
  }

  handleFormSubmit = event => {
    const { addInstaName } = this.state
    const { addAmount } = this.state
    const { addBidder } = this.props
    event.preventDefault()
    addBidder({
      username: addInstaName,
      amount: addAmount,
    })
    this.setState({ addInstaName: '', addAmount: '' })
  }

  renderAddForm = () => {
    const { addInstaName, addAmount } = this.state

    return (
      <div className="" style={{ marginBottom: 30 }}>

        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                value={addInstaName}
                placeholder="Ex: Insta.Cool"
                onChange={e => this.handleInputChange('addInstaName', e.target.value)}
                id="username"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                value={addAmount}
                placeholder="Ex: 123"
                onChange={e => this.handleInputChange('addAmount', e.target.value)}
                id="amount"
                type="number"
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-primary">BID NOW</button>
          </div>
        </form>

      </div>
    )

  }

  renderBidders() {
    const { data } = this.props
    const bidders = _.map(data, (value, key) => {
      return <SingleBidder key={key} bidderId={key} bidder={value}/>
    })
    if (!_.isEmpty(bidders)) {
      return bidders
    }
    return (
      <div className="">vuoto </div>
    )
  }

  componentWillMount() {
    this.props.fetchBidders()
  }

  render() {
    return (
      <div className="">

        {this.renderAddForm()}

        {this.renderBidders()}

      </div>
    )
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data,
  }
}

export default connect(mapStateToProps, actions)(BidderList)