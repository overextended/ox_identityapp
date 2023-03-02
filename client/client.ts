import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';

let licenses: Record<string, { issued: Date }> = {};

RegisterNuiCallback('getCharacter', (_: any, cb: Function) => {
  console.log('getCharacter');
  const gender = player?.get('gender');
  cb({
    firstName: player?.firstname,
    lastName: player?.lastname,
    dob: player?.get('dateofbirth'),
    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
  });
});
