import axios from 'axios'

export function getDbUrl() {
  return function(dispatch) {
    axios.get('/config/sync').then(function(response) {
      dispatch({type: 'FETCH_DB_URL_FULFILLED', payload: response.data})
    }).catch(function(error) {
      dispatch({type: 'FETCH_DB_URL_REJECTED', payload: error})
    })
  }
}
