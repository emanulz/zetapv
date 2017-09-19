const PouchDB = require('pouchdb')

const userModel = {
  'docType': 'USER',
  'created': '',
  'updated': '',
  'name': '',
  'last_name': '',
  'id': '',
  'username': '',
  'password': '',
  'password2': '',
  'is_admin': false
}

const stateConst = {
  usersFetchError: '',
  users: [],
  userActive: userModel,
  nextUser: 0,
  previousUser: 0
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SET_NEXT_PREV_USER':
    {
      return {
        ...state,
        nextUser: action.payload.next,
        previousUser: action.payload.previous
      }
    } // case

    case 'CLEAR_NEXT_PREV_USER':
    {
      return {
        ...state,
        nextUser: 0,
        previousUser: 0
      }
    } // case

    case 'FETCH_USERS_FULFILLED':
    {
      return {
        ...state,
        users: action.payload
      }

    } // case

    case 'FETCH_USERS_REJECTED':
    {
      return {
        ...state,
        users: {},
        userActive: userModel
      }
    } // case

    case 'SET_USER':
    {
      return {
        ...state,
        userActive: action.payload
      }
    }

    case 'CLEAR_USER':
    {
      return {
        ...state,
        userActive: userModel
      }
    }

    case 'NEW_USER':
    {
      const localDB = new PouchDB('users')
      const remoteDB = new PouchDB(`http://emanuelziga:emma101421@localhost:5984/users`)
      localDB.sync(remoteDB, {
        retry: true
      })
      return {
        ...state,
        userActive: userModel
      }
    }

    case 'UPDATED_USER':
    {
      const localDB = new PouchDB('users')
      const remoteDB = new PouchDB(`http://emanuelziga:emma101421@localhost:5984/users`)
      localDB.sync(remoteDB, {
        retry: true
      })
      return {
        ...state,
        userActive: action.payload
      }
    }

  } // switch

  return state // default return

} // reducer
