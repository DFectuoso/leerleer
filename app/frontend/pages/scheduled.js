import React, { Component } from 'react'
import Page from '~base/page'

export default Page({
  path: '/siguientes',
  title: 'About',
  exact: true,
  component: class extends Component {
    constructor (props) {
      super(props)
      this.state = {}
    }

    render () {
      return (
        <div className='About'>
          <h2>Estos son los que siguen</h2>
        </div>
      )
    }
  }
})
