import React, { createContext, useState } from 'react';
import { IAlert } from './useSnackbar';

export interface ISnackBar {
  addAlert: ({ message, type }: IAlert) => void;
  alert: IAlert | null;
  isOpen: boolean;
  handleClose: () => void;
}

// @ts-ignore
export const SnackbarContext = createContext<ISnackBar>(null);

const SnackbarProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);

  const addAlert = (alert: IAlert) => {
    setAlert(alert);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        alert,
        addAlert,
        handleClose,
        isOpen,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
