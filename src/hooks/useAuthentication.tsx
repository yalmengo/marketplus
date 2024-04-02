import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

interface AuthState {
  user: firebase.User | null;
  isLoading: boolean;
  error: firebase.auth.Error | null;
}

const useAuthentication = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        setState({ user, isLoading: false, error: null });
      },
      error => {
        setState({ user: null, isLoading: false, error });
      },
    );

    return unsubscribe;
  }, []);

  return state;
};

export default useAuthentication;
