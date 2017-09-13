const initialState = {
  currentUser: {
    name: 'Some guy',
    avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
    description: 'Web Developer',
    username: 'test'
  }
};

const session = (state = initialState, action) => {
  
  if (action.type === 'SET_CURRENT_USER') {
    return {...state, currentUser: action.user};
  }

  return state;
};

export default session;