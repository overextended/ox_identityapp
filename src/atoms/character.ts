import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export interface Character {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  licenses?: number[];
}

const characterAtom = atom<Character>({
  key: 'character',
  default: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  },
});

export const useCharacterValue = () => useRecoilValue(characterAtom);
export const useSetCharacter = () => useSetRecoilState(characterAtom);
export const useCharacterState = () => useRecoilState(characterAtom);
