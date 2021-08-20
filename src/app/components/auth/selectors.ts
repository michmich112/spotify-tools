import store from '../../store';
import { AuthenticationState } from './types';

export function getAuth(): AuthenticationState {
  return store.getState().authentication as AuthenticationState;
}

export function isAuthed(): boolean {
  return (store.getState().authentication as AuthenticationState).authed;
}

