import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ISharedCard } from '../pages/shared/Shared';
import fetchNui from '../utils/fetchNui';

const CARDS: ISharedCard[] = [
  {
    firstName: 'Michael',
    lastName: 'De Santa',
    documents: [
      { type: 'id', dob: '01/01/1999', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '01/01/2023' },
    ],
  },
  {
    firstName: 'Franklin',
    lastName: 'Clinton',
    documents: [
      { type: 'id', dob: '15/03/1889', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '02/02/2023' },
      { type: 'license', name: 'Weapons', issued: '23/05/2007' },
    ],
  },
];

const sharedDocumentsAtom = atom<ISharedCard[]>({
  key: 'sharedDocuments',
  default: selector({
    key: 'defaultSharedDocumentsValue',
    get: async () => {
      const resp = await fetchNui('getShared', null, CARDS);

      if (!resp) return [];

      return resp;
    },
  }),
});

export const useSharedDocumentsValue = () => useRecoilValue(sharedDocumentsAtom);
export const useSetSharedDocuments = () => useSetRecoilState(sharedDocumentsAtom);
export const useSharedDocumentsState = () => useRecoilState(sharedDocumentsAtom);
