const initialState = {
  navDrawerOpen: false
}

const control = (state = initialState, action) => {
  if (action.type === 'TOGGLE_NAV_DRAWER') {
    return {...state, navDrawerOpen: !state.navDrawerOpen};
  }

  return state;
}

export default control;