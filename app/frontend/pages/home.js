import React, { Component } from 'react'
import Page from '~base/page'

export default Page({
  path: '/',
  title: 'Home',
  exact: true,
  component: class extends Component {
    constructor (props) {
      super(props)
      this.state = {}
    }

    render () {
      return (
        <section className='home hero is-info bsa'>
          <div className='container'>
            <div className='columns is-vcentered'>
              <div className='column is-4'>
                <p className='title'>LeerLeer</p>
                <p className='subtitle'>Bienvenido a Leer Leer, aqui vas a poder ver los libros que ya revisamos, los que vamos a revisar y sugerir algunos!</p>
              </div>

              <div className='column is-8'>
                <div className='bsa-cpc' />
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
})
