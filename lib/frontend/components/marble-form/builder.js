import React, { Component } from 'react'
import { MarbleForm } from './'
import FontAwesome from 'react-fontawesome'
import BaseModal from '~base/components/base-modal'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc'

const WidgetSchemas = {
  NumberWidget: {
    type: {
      name: 'Type',
      type: 'string',
      widget: 'SelectWidget',
      options: ['number'],
      placeholder: 'Select type',
      required: true
    },
    minimum: {
      name: 'Minimum',
      type: 'number',
      placeholder: 'Select minimum',
      widget: 'NumberWidget'
    },
    maximum: {
      name: 'Maximum',
      type: 'number',
      placeholder: 'Select maximum',
      widget: 'NumberWidget'
    }
  },
  SelectWidget: {
    options: {
      name: 'Options',
      placeholder: 'Select options',
      widget: 'MultipleSelectWidget',
      addable: true
    }
  },
  MultipleSelectWidget: {
    options: {
      name: 'Options',
      placeholder: 'Select options',
      widget: 'MultipleSelectWidget',
      addable: true
    },
    addable: {
      name: 'Addable?',
      widget: 'CheckboxWidget'
    }
  }
}

const SortableItem = SortableElement(props => {
  const DragHandle = SortableHandle(() => <div className='card-header-title is-flex'>
    <div className='is-fullwidth'>
      {props.item.name} {props.item.required ? '*' : ''}
    </div>
    <div className='is-fullwidth has-text-weight-normal has-text-right'>
      <small>{props.item.widget}</small>
    </div>
  </div>)

  return <div className='card'>
    <div className='card-header'>
      <DragHandle />
      <div className='card-header-icon'>
        <a className='icon' onClick={() => props.showModal(props.widgetIndex)}>
          <i className='fa fa-edit' />
        </a>
        <a className='icon' onClick={() => props.removeWidget(props.widgetIndex)}>
          <i className='fa fa-trash' />
        </a>
      </div>
    </div>
  </div>
})

const SortableList = SortableContainer(props => {
  return (
    <div>
      {props.items.map((item, index) => {
        return <SortableItem
          key={`item-${index}`}
          item={item}
          index={index}
          widgetIndex={index}
          showModal={d => props.showModal(d)}
          removeWidget={d => props.removeWidget(d)}
        />
      })}
    </div>
  )
})

class FormWidget extends Component {
  constructor (props) {
    super(props)
    const initialData = props.initialData || {}
    this.state = {
      initialData,
      currentWidget: props.currentWidget,
      widgetSchema: WidgetSchemas[initialData.widget] || {}
    }
  }

  componentWillReceiveProps (props) {
    const initialData = 'initialData' in props ? props.initialData : this.props.initialData
    this.setState({
      initialData,
      currentWidget: props.currentWidget,
      widgetSchema: WidgetSchemas[initialData.widget] || {}
    })
  }

  onChange (data, index) {
    this.setState({
      currentWidget: index,
      widgetSchema: WidgetSchemas[data.widget] || {}
    })
  }

  onSubmit (data, index) {
    this.props.onSubmit(data, index)
    this.clearState()
  }

  clearState () {
    this.setState({
      initialData: this.props.initialData
    })
  }

  render () {
    const schema = {
      widget: {
        name: 'Widget',
        type: 'string',
        options: [
          'TextWidget',
          'EmailWidget',
          'NumberWidget',
          'TextareaWidget',
          'SelectWidget',
          'MultipleSelectWidget',
          'DateWidget',
          'DateTimeWidget',
          'CheckboxWidget'
        ],
        placeholder: 'Select widget',
        widget: 'SelectWidget',
        required: true
      },
      id: {
        name: 'ID',
        type: 'string',
        placeholder: 'Add ID',
        widget: 'TextWidget',
        required: true
      },
      name: {
        name: 'Name',
        type: 'string',
        placeholder: 'Add name',
        widget: 'TextWidget',
        required: true
      },
      type: {
        name: 'Type',
        type: 'string',
        widget: 'SelectWidget',
        options: ['string', 'number', 'boolean'],
        placeholder: 'Add type',
        required: true
      },
      placeholder: {
        name: 'Placeholder',
        type: 'string',
        widget: 'TextWidget'
      },
      required: {
        name: 'Required?',
        type: 'boolean',
        widget: 'CheckboxWidget'
      }
    }

    Object.keys(this.state.widgetSchema).map(key => {
      schema[key] = this.state.widgetSchema[key]
    })

    return <MarbleForm
      schema={schema}
      initialData={this.state.initialData}
      onChange={data => this.onChange(data, this.state.currentWidget)}
      onSubmit={data => this.onSubmit(data, this.state.currentWidget)}
      successMessage=''
      errorMessage=''
    />
  }
}

class FormBuilder extends Component {
  constructor (props) {
    super(props)
    const initialSchema = props.initialSchema || {}
    this.state = {
      schema: initialSchema,
      currentWidget: -1,
      classNameModal: ''
    }

    this.state.widgets = Object.keys(initialSchema).map(key => {
      initialSchema[key].id = key
      return initialSchema[key]
    })
  }

  showModal (index) {
    this.setState({
      currentWidget: index,
      classNameModal: 'is-active'
    })
  }

  hideModal () {
    this.setState({
      currentWidget: -1,
      classNameModal: ''
    })
  }

  removeWidget (index) {
    let { widgets } = this.state
    delete widgets[index]
    this.setState({ widgets })
    this.onChange()
  }

  onSubmitWidget (data, index) {
    let { widgets } = this.state

    if (index > -1) {
      widgets[index] = data
    } else {
      widgets.push(data)
    }

    this.setState({ widgets })
    this.hideModal()
    this.onChange()
  }

  onSortEnd ({oldIndex, newIndex}) {
    this.setState({
      widgets: arrayMove(this.state.widgets, oldIndex, newIndex)
    })
    this.onChange()
  }

  onChange () {
    if (this.props.onChange) {
      const { widgets } = this.state
      const schema = {}
      widgets.map(widget => {
        schema[widget.id] = widget
      })
      this.props.onChange(schema)
    }
  }

  render () {
    const { widgets, currentWidget } = this.state

    let initialData = {}

    if (currentWidget > -1) {
      initialData = widgets[currentWidget]
    }

    const currentWidgetForm = <FormWidget
      currentWidget={currentWidget}
      initialData={initialData}
      onSubmit={(data, index) => this.onSubmitWidget(data, index)}
    />

    return <div>
      <div className='is-padding-bottom-small has-text-right'>
        <a
          className='button is-small is-primary'
          onClick={() => this.showModal(-1)}
          style={{
            height: 32,
            width: 32,
            borderRadius: '100%'
          }}
        >
          <FontAwesome name='plus' />
        </a>
      </div>

      <SortableList
        items={widgets}
        onSortEnd={d => this.onSortEnd(d)}
        showModal={d => this.showModal(d)}
        removeWidget={d => this.removeWidget(d)}
        useDragHandle
      />

      <BaseModal
        title={currentWidget < 0 ? 'Add Widget' : 'Edit Widget'}
        className={this.state.classNameModal}
        hideModal={() => this.hideModal()}
      >
        {currentWidgetForm}
      </BaseModal>
    </div>
  }
}

export default FormBuilder
