import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../reducers'

import Header from '../components/header'
import './all.sass'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

const Layout = ({ children, data }) => (
  <wrapper>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'scrivi qualcosa non ti dimenticare' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title}/>
    <Provider store={store}>
      {children()}
    </Provider>
  </wrapper>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
