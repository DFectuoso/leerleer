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
        <section className='home hero is-bold is-medium'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>Leer Leer</h1>
              <h2 className='subtitle'>Leemos libros, comentamos lo que aprendimos en video.</h2>
              <h2 className='subtitle'>Anteriores: <a href='https://www.youtube.com/watch?v=Tl61g4jid40'>Never split the difference</a>, <a href='https://www.youtube.com/watch?v=HM4qQN36WJY'>The undoing project</a>, <a href='https://www.youtube.com/watch?v=8bMG7EiziCo'>Bad Blood</a></h2>
              <h2 className='subtitle'>Siguiente:. Think fast and slow, Septiembre 6, 2018. 5:00 pm PST -6</h2>

              
            </div>
          </div>
        </section>
      )
    }
  }
})
