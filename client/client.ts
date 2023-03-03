import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';

let licenses: Record<string, { issued: Date }> = {};

RegisterNuiCallback('getCharacter', (_: any, cb: Function) => {
  const gender = player?.get('gender');
  cb({
    firstName: player?.firstname,
    lastName: player?.lastname,
    dob: player?.get('dateofbirth'),
    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
  });
});

RegisterNuiCallback('getLicenses', async (_: any, cb: Function) => {
  const resp = await triggerServerCallback<Record<string, { issued: Date }>>('ox:getLicense', null);
  // @ts-ignore
  console.log(JSON.stringify(resp, null, 2));
  cb(resp);
});
