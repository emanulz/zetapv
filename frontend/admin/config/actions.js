import axios from 'axios'
import alertify from 'alertifyjs'

export function loadConfig(config, type, success, fail) {
  return function(dispatch) {
    axios.get(`/config/${type}/${config}`).then(function(response) {
      // The property to modify in reducer
      const propertyText = type + config.charAt(0).toUpperCase() + config.slice(1)
      console.log(propertyText)
      dispatch({type: success, payload: {data: response.data, property: propertyText}})
    }).catch(function(error) {
      dispatch({type: fail, payload: error})
    })
  }
}

export function saveConfig(config, type, success, fail, object) {

  return function(dispatch) {
    axios.post(`/config/${type}/${config}`, object).then(function(response) {
      alertify.alert('Completado', `Configuración almacenada correctamente`)

      dispatch(loadConfig(config, type, success, fail))

    }).catch(function(err) {
      alertify.alert('Error', `Hubo un error al guardar la configuración, por favor intente de nuevo ERROR:${err}`)
    })
  }
}
