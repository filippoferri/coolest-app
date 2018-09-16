import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Link from 'gatsby-link'

import { CLIENT } from "../config/paypalClient";

import PaypalButton from '../components/PaypalButton'

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox'

const STYLE = {
  layout: 'horizontal',  // horizontal | vertical
  size: 'large',         // medium | large | responsive
  shape: 'pill',         // pill | rect
  color: 'gold',         // gold | blue | silver | black
}

class goBuy extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addInstaName: '',
      addAmount: '',
      success: false,
      error: false,
      cancel: false,
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value })
  }

  addNewBidder(details) {
    const { addInstaName } = this.state
    const { addAmount } = this.state
    const { addBidder } = this.props
    addBidder({
      username: addInstaName,
      amount: addAmount,
      details: details,
    })
    this.setState({ addInstaName: '', addAmount: '', success: true })
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

  getMaxAmount(data) {

    var newData = this.reverseObject(data)
    var keys = []

    for (var key in newData) {
      keys.push(key)
    }

    var value = data[keys[0]]

    return value.amount
  }

  renderInputAmount() {

    const { data } = this.props

    const minAmount = this.getMaxAmount(data)

    return (
      <div className="field">
        <div className="control">
          <input
            className="input is-large"
            type="number"
            step="0.10"
            min={minAmount * 1.10}
            max={minAmount * 1.60}
            placeholder={minAmount ? 'Minimum is: ' + minAmount * 1.10 + 'USD' : null}
            value={this.state.addAmount}
            onChange={e => this.updateInput('addAmount', e.target.value)}
          />
        </div>
      </div>
    )
  }

  render() {

    const onSuccess = (payment) =>
      this.addNewBidder(payment)

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error)

    const onCancel = (data) =>
      console.log('Cancelled payment!', data)

    const responseInstagram = (response) =>
      console.log(response)

    if (this.state.success) {
      return (
        <div className="container has-text-centered">
          <div className="has-text-centered">Epic!!!</div>
          <Link to="/">
            <button className="button is-primary">Discover the home if you're cool</button>
          </Link>
        </div>
      )
    }

    return (
      <section className="section">
        <div className="container" style={{ marginBottom: 50 }}>
          <div className="columns">
            <div className="column is-4-desktop is-offset-4-desktop has-text-centered">

              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="Type item here"
                    value={this.state.addInstaName}
                    onChange={e => this.updateInput('addInstaName', e.target.value)}
                  />
                </div>
              </div>

              {this.renderInputAmount()}

              <PaypalButton
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'USD'}
                total={this.state.addAmount}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                style={STYLE}
            />

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

export default connect(mapStateToProps, actions)(goBuy)