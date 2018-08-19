import React, { Component } from 'react'
import Page from '~base/page'
import {loggedIn} from '~base/middlewares/'
import FormBuilder from './components/builder'

import 'react-select/scss/default.scss'
import 'react-datepicker/src/stylesheets/datepicker.scss'

import MarbleForm from '~base/components/marble-form'

class FormBuilderContainer extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      schema: {
        'name': {
          'label': 'Name',
          'default': 'rr'
        },
        'number': {
          'widget': 'NumberWidget',
          'minimum': 0,
          'maximum': 10,
          'default': 5,
          'name': 'number',
          'label': 'Number',
          'type': 'number'
        },
        'second': {
          'widget': 'NumberWidget',
          'minimum': 0,
          'maximum': 10,
          'step': 0.5,
          'name': 'second',
          'label': 'Second',
          'type': 'number'
        },
        'lol': {
          'widget': 'DateWidget',
          'name': 'lol',
          'label': 'lol'
        }        
      },
      result: null,
      currentDisplay: 'form'
    }
  }

  onChange (schema) {
    this.setState({ schema })
  }

  setCurrentDisplay (currentDisplay) {
    this.setState({currentDisplay})
  }

  setResult (result) {
    this.setState({result})
  }

  render () {
    const { schema, currentDisplay, result } = this.state

    const formEl = <div>
      <MarbleForm schema={schema} initialData={{}} onSubmit={(data) => this.setResult(data)} />
      {result && <pre style={{marginTop: 20}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>

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
                    <div className='tabs'>
                      <ul>
                        <li onClick={() => this.setCurrentDisplay('form')} className={currentDisplay === 'form' ? 'is-active' : ''}><a>Form</a></li>
                        <li onClick={() => this.setCurrentDisplay('schema')} className={currentDisplay === 'schema' ? 'is-active' : ''}><a>Schema</a></li>
                      </ul>
                    </div>
                  </header>
                  <div className='card-content'>
                    { currentDisplay === 'form' && formEl }
                    { currentDisplay === 'schema' && <pre>{JSON.stringify(schema, null, 2)}</pre> }
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
