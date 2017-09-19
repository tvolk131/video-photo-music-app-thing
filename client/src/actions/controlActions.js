const toggleNavDrawer = () => ({
  type: 'TOGGLE_NAV_DRAWER'
});

const setCurrentPassword = (password) => ({
  type: 'SET_CURRENT_PASSWORD',
  payload: password
});

const setNewPassword = (password) => ({
  type: 'SET_NEW_PASSWORD',
  payload: password
});

const openPasswordDialog = () => ({
  type: 'OPEN_PASSWORD_DIALOG'
});

const closePasswordDialog = () => ({
  type: 'CLOSE_PASSWORD_DIALOG'
});

const resetPassword = () => ({
  type: 'RESET_PASSWORD'
});

const toggleEditUser = () => ({
  type: 'TOGGLE_EDIT_USER'
});

const setUploadedFileUrl = (fileUrl) => ({
  type: 'SET_UPLOADED_FILE_URL',
  fileUrl
});

const alert = (message = 'ERROR', type = null) => ({
  type: 'ALERT',
  alert: {message, type}
});

const clearAlert = () => ({
  type: 'CLEAR_ALERT'
});

export {
  toggleNavDrawer,
  setUploadedFileUrl,
  toggleEditUser,
  setCurrentPassword,
  setNewPassword,
  openPasswordDialog,
  closePasswordDialog,
  resetPassword,
  alert,
  clearAlert
};
