import { useContext } from 'react';
import {ISnackBar, SnackbarContext} from './SnackbarProvider';

export interface IAlert {
  message: string;
  type: AlertType;
  duration?: number;
}

export type AlertType = 'success' | 'error' | 'info' | 'warning';


export const useSnackbar = (): ISnackBar => useContext(SnackbarContext);