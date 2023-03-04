import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';

RegisterNuiCallback('openApp', async (_: any, cb: Function) => {
  const gender = player?.get('gender');
  const licenses = await triggerServerCallback<Record<string, { issued: string }>>('ox:getLicense', null);
  cb({
    character: {
      firstName: player?.firstname,
      lastName: player?.lastname,
      dob: player?.get('dateofbirth'),
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    licenses,
  });
});
