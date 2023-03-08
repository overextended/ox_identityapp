import { onClientCallback } from '@overextended/ox_lib/server';
import { GetPlayer } from '@overextended/ox_core/server';
import type { ServerIdentityData } from '../typings/documents';

onClientCallback('ox_identityapp:shareIdentity', (playerId, id: number) => {
  const player = GetPlayer(id);

  if (!player || playerId === id) return false;

  const data: ServerIdentityData = {
    uid: player.userid,
    firstName: player.firstname,
    lastName: player.lastname,
    dob: player.get('dateofbirth'),
    gender: player.get('gender'),
  };

  emitNet('ox_identityapp:addIdentity', id, data);

  return true;
});

onClientCallback('ox_identityapp:shareDocument', (playerId, data: { id: number; document: string }) => {
  const player = GetPlayer(playerId);

  if (!player || playerId === data.id) return false;

  console.log(data.document);
  const document = player.getLicense(data.document);
  console.log('Document:', document);
  if (!document) return false;

  emitNet('ox_identityapp:addDocument', data.id, {
    userId: player.userid,
    firstName: player.firstname,
    lastName: player.lastname,
    name: data.document,
    issued: document.issued,
  });

  return true;
});
