import { onClientCallback } from '@overextended/ox_lib/server';
import { GetPlayer } from '@overextended/ox_core/server';
import type { ServerIdentityData, ServerLicenseData } from '../typings/documents';

onClientCallback('ox_identityapp:shareIdentity', (playerId, id: number) => {
  const player = GetPlayer(playerId);

  if (!player || playerId === id) return false;

  const data: ServerIdentityData = {
    uid: player.userid,
    type: 'id',
    firstName: player.firstname,
    lastName: player.lastname,
    dob: player.get('dateofbirth'),
    gender: player.get('gender'),
  };

  emitNet('ox_identityapp:addDocument', id, data);

  return true;
});

onClientCallback('ox_identityapp:shareDocument', (playerId, data: { id: number; document: string }) => {
  const player = GetPlayer(playerId);

  if (!player || playerId === data.id) return false;

  const document = player.getLicense(data.document);
  if (!document) return false;

  const cbData: ServerLicenseData = {
    uid: player.userid,
    type: 'license',
    firstName: player.firstname,
    lastName: player.lastname,
    name: data.document,
    issued: document.issued,
  };

  emitNet('ox_identityapp:addDocument', data.id, cbData);

  return true;
});
