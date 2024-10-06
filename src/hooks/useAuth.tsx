import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { hiddeSpinner, showSpinner } from '@/store/slices/users/ui';
import { GoogleAuthResponse, useApiCalendar } from './useApiCalendar';
import { useNavigate } from "react-router-dom";

interface AuthUser {
  tokens: {
    accessToken: string
  }; // Cambia al tipo correcto para los tokens
  user: string; // Cambia al tipo correcto para el usuario
}

interface AuthHook {
  loading: boolean;
  error: boolean;
  authUser: AuthUser | null;
  isAuth: boolean;
  checkUserIsLogged: () => void;
  setAuthUserLocalStorage: (dataUser: AuthUser) => void;
  login: (data: string) => void;
  logout: () => void;
  clearLogVars: () => void;
}

export const useAuth = (): AuthHook => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { handleItemClick } = useApiCalendar({ loadEvents: false })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   const checkAuth = setTimeout(() => {
  //     checkUserIsLogged();
  //   }, 1000);
  //   return () => clearTimeout(checkAuth);
  // }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('auth');
    const user = JSON.parse(loggedUser || 'null');
    if (user) {
      setAuthUser(user);
      setIsAuth(true);
    }
  }, []);

  const login = async (): Promise<any> => {
    dispatch(showSpinner('Estamos validando la información'));
    const data: GoogleAuthResponse = await handleItemClick('sign-in')
    console.log('data sign-in', data)
    setAuthUserLocalStorage(data)
    dispatch(hiddeSpinner())
    return navigate('/')
  };

  const logout = (): void => {
    if (authUser?.tokens?.accessToken) {
      dispatch(showSpinner('Estamos validando la información'));
      
    } else {
      setIsAuth(false);
      // router.push('/authentication/login')
    }
  };

  const clearLogVars = () => {
    window.localStorage.removeItem('auth');
    setIsAuth(false);
    setAuthUser(null);
  };

  const checkUserIsLogged = (): void => {
    const loggedUser = window.localStorage.getItem('auth');
    if (!loggedUser) {
      // router.push('/authentication/login')
    } else {
      setIsAuth(true);
    }
  };

  const setAuthUserLocalStorage = (dataUser) => {
    const {
        access_token: accessToken,
        token_type: tokenType,
        expires_in: expiresIn,
        scope
      } = dataUser;
    const data = {
      accessToken,
      tokenType,
      expiresIn,
      scope,
    }
    window.localStorage.setItem('auth', JSON.stringify(data));
  };

  return {
    loading,
    error,
    authUser,
    isAuth,
    checkUserIsLogged,
    setAuthUserLocalStorage,
    login,
    logout,
    clearLogVars
  };
};
