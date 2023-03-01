import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const shareLicenseDialogAtom = atom<{ license: string; visible: boolean }>({
  key: 'shareLicenseDialog',
  default: {
    license: '',
    visible: false,
  },
});

export const useShareLicenseDialogValue = () => useRecoilValue(shareLicenseDialogAtom);
export const useSetShareLicenseDialog = () => useSetRecoilState(shareLicenseDialogAtom);
export const useShareLicenseDialogState = () => useRecoilState(shareLicenseDialogAtom);
