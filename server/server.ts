import { onClientCallback } from '@overextended/ox_lib/server';
import { GetPlayer } from '@overextended/ox_core/server';

onClientCallback('ox_identityapp:shareIdentity', (playerId, id: number) => {
  const player = GetPlayer(id);

  if (!player || playerId === id) return false;

  const data = {
    uid: player.userid,
    firstName: player.firstname,
    lastName: player.lastname,
    dob: player.get('dateofbirth'),
    gender: player.get('gender'),
  };

  emitNet('ox_identityapp:addIdentity', id, data);

  return true;
});
