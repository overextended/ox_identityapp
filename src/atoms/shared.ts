import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '../utils/fetchNui';
import type { SharedDocument } from '../../typings/documents';

const CARDS: SharedDocument[] = [
  {
    firstName: 'Michael',
    lastName: 'De Santa',
    shareTime: Date.now(),
    documents: [
      { type: 'id', dob: '01/01/1999', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '01/01/2023', label: 'Driving license' },
    ],
  },
  {
    firstName: 'Franklin',
    lastName: 'Clinton',
    shareTime: Date.now(),
    documents: [
      { type: 'id', dob: '15/03/1889', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '02/02/2023', label: 'Driving license' },
      { type: 'license', name: 'Weapons', issued: '23/05/2007', label: 'Weapons license' },
    ],
  },
];

const sharedFilterAtom = atom({
  key: 'sharedFilter',
  default: '',
});

const sharedDocumentsAtom = atom<SharedDocument[]>({
  key: 'sharedDocuments',
  default: selector({
    key: 'defaultSharedDocumentsValue',
    get: async ({ get }) => {
      const resp = await fetchNui('getShared', null, CARDS);

      if (!resp) return [];

      const filterVal = get(sharedFilterAtom).toLowerCase();

      if (!filterVal || filterVal === '') return resp;

      return resp.filter((document) => `${document.firstName} ${document.lastName}`.toLowerCase().includes(filterVal));
    },
  }),
});

export const useSharedFilterValue = () => useRecoilValue(sharedFilterAtom);
export const useSetSharedFilter = () => useSetRecoilState(sharedFilterAtom);
export const useSharedFilterState = () => useRecoilState(sharedFilterAtom);

export const useSharedDocumentsValue = () => useRecoilValue(sharedDocumentsAtom);
export const useSetSharedDocuments = () => useSetRecoilState(sharedDocumentsAtom);
export const useSharedDocumentsState = () => useRecoilState(sharedDocumentsAtom);
