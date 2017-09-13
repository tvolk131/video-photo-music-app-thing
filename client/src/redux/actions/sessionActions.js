const toggleNavDrawer = () => {
  return {
    type: 'LOG_OUT',
    payload: {
      request: {
        url: '/logout'
      }
    }
  };
};

const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  user
});

export { toggleNavDrawer, setCurrentUser };