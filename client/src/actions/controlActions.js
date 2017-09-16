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

const resetPassword = () => {
  return {
    type: 'RESET_PASSWORD'
  }
}

const toggleEditUser = () => ({
  type: 'TOGGLE_EDIT_USER'
});

export {
  toggleNavDrawer,
  toggleEditUser
  setCurrentPassword,
  setNewPassword,
  openPasswordDialog,
  closePasswordDialog,
  resetPassword
};
