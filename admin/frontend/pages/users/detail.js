import React, { Component } from 'react'
import { branch } from 'baobab-react/higher-order'
import PropTypes from 'baobab-react/prop-types'
import api from '~base/api'
import moment from 'moment'
import Loader from '~base/components/spinner'

import {
  SimpleTable,
  TableBody,
  BodyRow,
  TableData,
  TableHeader
} from '~base/components/base-table'
import Multiselect from '~base/components/base-multiselect'

class UserDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      loading: true,
      user: {},
      orgs: []
    }
  }

  componentWillMount () {
    this.load()
    this.loadOrgs()
  }

  async load () {
    var url = '/admin/users/' + this.props.match.params.uuid
    const body = await api.get(url)

    await this.setState({
      loading: false,
      loaded: true,
      user: body.data
    })
  }

  async loadOrgs () {
    var url = '/admin/organizations/'
    const body = await api.get(
      url,
      {
        user: this.props.match.params.uuid,
        start: 0,
        limit: 0
      }
    )

    this.setState({
      ...this.state,
      orgs: body.data
    })
  }

  getDateCreated () {
    if (this.state.user.dateCreated) {
      return moment.utc(
        this.state.user.dateCreated
      ).format('DD/MM/YYYY hh:mm a')
    }

    return 'N/A'
  }

  async availableRowOnClick (uuid) {
    var url = '/admin/users/' + this.props.match.params.uuid + '/add/organization'
    await api.post(url,
      {
        organization: uuid
      }
    )

    this.load()
    this.loadOrgs()
  }

  async assignedRowOnClick (uuid) {
    var url = '/admin/users/' + this.props.match.params.uuid + '/remove/organization'
    await api.post(url,
      {
        organization: uuid
      }
    )

    this.load()
    this.loadOrgs()
  }

  render () {
    const { user } = this.state

    if (!user.uuid) {
      return <Loader />
    }

    return (
      <div className='columns c-flex-1 is-marginless'>
        <div className='column is-paddingless'>
          <div className='section'>
            <div className='columns'>
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      { user.displayName }
                    </p>
                  </header>
                  <div className='card-content'>
                    <SimpleTable>
                      <TableBody>
                        <BodyRow>
                          <TableHeader>
                            Name
                          </TableHeader>
                          <TableData>
                            {user.name || 'N/A'}
                          </TableData>
                        </BodyRow>
                        <BodyRow>
                          <TableHeader>
                            Email
                          </TableHeader>
                          <TableData>
                            {user.email}
                          </TableData>
                        </BodyRow>
                        <BodyRow>
                          <TableHeader>
                            Screen name
                          </TableHeader>
                          <TableData>
                            {user.screenName}
                          </TableData>
                        </BodyRow>
                        <BodyRow>
                          <TableHeader>
                            Display name
                          </TableHeader>
                          <TableData>
                            {user.displayName}
                          </TableData>
                        </BodyRow>
                        <BodyRow>
                          <TableHeader>
                            Is admin?
                          </TableHeader>
                          <TableData>
                            {user.isAdmin ? 'Yes' : 'No'}
                          </TableData>
                        </BodyRow>
                      </TableBody>
                    </SimpleTable>
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      Organizations
                    </p>
                  </header>
                  <div className='card-content'>
                    <Multiselect
                      assignedList={user.organizations}
                      availableList={this.state.orgs}
                      dataFormatter={(item) => { return item.name || 'N/A' }}
                      availableClickHandler={this.availableRowOnClick.bind(this)}
                      assignedClickHandler={this.assignedRowOnClick.bind(this)}
                    />
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

UserDetail.contextTypes = {
  tree: PropTypes.baobab
}

export default branch({}, UserDetail)
