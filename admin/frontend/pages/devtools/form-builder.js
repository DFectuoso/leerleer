import React, { Component } from 'react'
import Page from '~base/page'
import {loggedIn} from '~base/middlewares/'
import FormBuilder from '~base/components/marble-form/builder'

import 'react-select/scss/default.scss'
import 'react-datepicker/src/stylesheets/datepicker.scss'

class FormBuilderContainer extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      schema: {}
    }
  }

  onChange (schema) {
    this.setState({ schema })
  }

  render () {
    const { schema } = this.state

    return (
      <div className='columns c-flex-1 is-marginless'>
        <div className='column is-paddingless'>
          <div className='section'>
            <div className='columns'>
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      Form Builder
                    </p>
                  </header>
                  <div className='card-content'>
                    <FormBuilder
                      initialSchema={schema}
                      onChange={schema => this.onChange(schema)}
                    />
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      Form Schema
                    </p>
                  </header>
                  <div className='card-content'>
                    <pre>{JSON.stringify(schema, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page({
  path: '/devtools/form-builder',
  icon: 'file',
  title: 'Form Builder',
  exact: true,
  validate: loggedIn,
  component: FormBuilderContainer
})
