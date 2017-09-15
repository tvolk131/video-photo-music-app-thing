const toggleNavDrawer = () => {
  return {
    type: 'TOGGLE_NAV_DRAWER'
  };
};

const setCurrentPassword = (password) => {
  return {
    type: 'SET_CURRENT_PASSWORD',
    payload: password
  };
};

const setNewPassword = (password) => {
  return {
    type: 'SET_NEW_PASSWORD',
    payload: password
  };
};

const openPasswordDialog = () => {
  return {
    type: 'OPEN_PASSWORD_DIALOG'
  };
};

const closePasswordDialog = () => {
  return {
    type: 'CLOSE_PASSWORD_DIALOG'
  };
};

export { toggleNavDrawer, setCurrentPassword, setNewPassword, openPasswordDialog, closePasswordDialog };