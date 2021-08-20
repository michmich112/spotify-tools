import { getAuth, isAuthed } from './components/auth/selectors';
import { getUser, getUserName } from './components/user/selectors';

const AppSelectors = {
  auth: {
    getAuth,
    isAuthed,
  },
  user: {
    getUser,
    getUserName
  }
}

export default AppSelectors;

