const initialState = {
  navDrawerOpen: false,
  settings: {
    password: {
      current: '',
      new: '',
      dialogOpen: false
    }
  },
  alert: {
    message: null,
    type: null
  }
}

const control = (state = initialState, action) => {
  if (action.type === 'ALERT') {
    return {...state, alert: action.alert};
  }
  if (action.type === 'CLEAR_ALERT') {
    return {...state, alert: {message: null, type: null}};
  }  
  if (action.type === 'TOGGLE_NAV_DRAWER') {
    return {...state, navDrawerOpen: !state.navDrawerOpen};
  }
  if (action.type === 'SET_CURRENT_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, current: action.payload}}};
  }
  if (action.type === 'SET_NEW_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, new: action.payload}}};
  }
  if (action.type === 'OPEN_PASSWORD_DIALOG') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, dialogOpen: true}}};
  }
  if (action.type === 'CLOSE_PASSWORD_DIALOG') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, dialogOpen: false}}};
  }
  if (action.type === 'RESET_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, current: '', new: '', dialogOpen: false}}};
  }
  if (action.type === 'TOGGLE_EDIT_USER') {
    return {...state, editingUser: !state.editingUser};
  }

  if (action.type === 'TOGGLE_EDIT_PROJECT') {
    return {...state, editingProject: !state.editingProject};
  }

  if (action.type === 'SET_UPLOADED_FILE_URL') {
    return {...state, uploadedFileUrl: action.fileUrl};
  }

  if (action.type === 'TOGGLE_CREATE_COMPONENT_EXPANDED') {
    return {...state, createComponentExpanded: !state.createComponentExpanded};
  } 

  return state;
}

export default control;