import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

interface LoadingWrappedProps {
  children: React.ReactNode;
}

const LoadingWrapped: React.FC<LoadingWrappedProps> = ({ children }) => {
  const { loading, loadingMsg } = useSelector((state: any) => state.ui);

  return (
    <>
      {loading && <Loading msg={loadingMsg} />}
      {children}
    </>
  );
};

export default LoadingWrapped;