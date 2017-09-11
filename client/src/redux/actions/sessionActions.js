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

export { toggleNavDrawer };