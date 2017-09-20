const initialState = {
  results: [],
  searching: false
}

const search = (state = initialState, action) => {

  if (action.type === 'SEARCH_SUCCESS') {
    return {...state, results: action.payload.data.hits.hits, searching: false};
  }

  if (action.type === 'SEARCH_ERROR') {
    return {...state, results: action.response, searching: false};
  }

  if (action.type === 'SEARCH') {
    return {...state, searching: true};
  }

  return state;
}

export default search;