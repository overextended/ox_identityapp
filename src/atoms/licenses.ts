import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '../utils/fetchNui';

type Licenses = [string, { issued: string; label: string }][];

const licensesAtom = atom<Licenses | null>({
  key: 'licenses',
  default: selector({
    key: 'defaultLicensesValue',
    get: async () => {
      const resp = await fetchNui<Licenses | null>('getLicenses', null, [
        ['drivers', { issued: '01/01/1999', label: 'Drivers license' }],
      ]);

      if (!resp) return null;

      return resp;
    },
  }),
});

export const useLicensesValue = () => useRecoilValue(licensesAtom);
export const useSetLicenses = () => useSetRecoilState(licensesAtom);
export const useLicensesState = () => useRecoilState(licensesAtom);
