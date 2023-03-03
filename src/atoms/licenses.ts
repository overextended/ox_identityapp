import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type Licenses = [string, { issued: string }][];

const licensesAtom = atom<Licenses>({
  key: 'ox:Licenses',
  default: [],
});

export const useLicensesValue = () => useRecoilValue(licensesAtom);
export const useSetLicenses = () => useSetRecoilState(licensesAtom);
export const useLicensesState = () => useRecoilState(licensesAtom);
