const getters = {
  // device: state => state.app.device,
  isReadNotify: state => state.app.isReadNotify,
  userOnlineVoteTimes: state => state.app.userOnlineVoteTimes,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  signFlag: state => state.user.signFlag,
  role: state => state.user.role
  // sidebar: state => state.app.sidebar,
  // permission_routes: state => state.permission.routes
}
export default getters
