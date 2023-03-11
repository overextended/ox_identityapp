import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '../utils/fetchNui';

export interface Character {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  licenses?: number[];
}

const characterAtom = atom<Character>({
  key: 'character',
  default: selector({
    key: 'defaultCharacterValue',
    get: async () => {
      const resp = await fetchNui<Character>('getCharacter', null, {
        firstName: 'Trevor',
        lastName: 'Phillips',
        dob: '01/01/1780',
        gender: 'Male',
        licenses: [],
      });

      if (!resp)
        return {
          firstName: '',
          lastName: '',
          dob: '',
          gender: '',
          licenses: [],
        };

      return resp;
    },
  }),
});

export const useCharacterValue = () => useRecoilValue(characterAtom);
export const useSetCharacter = () => useSetRecoilState(characterAtom);
export const useCharacterState = () => useRecoilState(characterAtom);
