import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';
import type { SharedDocument, ServerIdentityData } from '../typings/documents';

const sharedDocuments = new Map<number, SharedDocument>();

RegisterNuiCallback('shareIdentity', async (id: number, cb: Function) => {
  const success = await triggerServerCallback<boolean>('ox_identityapp:shareIdentity', null, id);
  cb(success);
});

onNet('ox_identityapp:addIdentity', (data: ServerIdentityData) => {
  const sharedDocument = sharedDocuments.get(data.uid);
  let shared = false;
  if (!sharedDocument) {
    shared = true;
    sharedDocuments.set(data.uid, {
      firstName: data.firstName,
      lastName: data.lastName,
      shareTime: Date.now(),
      documents: [{ type: 'id', gender: data.gender, dob: data.dob }],
    });
  } else {
    const documents = sharedDocument.documents;
    const index = documents.findIndex((document) => document.type === 'id');

    if (index !== -1) return;

    shared = true;

    documents.push({ type: 'id', gender: data.gender, dob: data.dob });
    sharedDocuments.set(data.uid, { ...sharedDocuments.get(data.uid), documents });
  }

  if (!shared) return;
  global.exports['npwd'].createNotification({
    notisId: 'npwd:shareDocument',
    appId: 'ox_identityapp',
    content: `${data.firstName} ${data.lastName} shared a document with you!`,
    keepOpen: false,
    duration: 5000,
    path: '/ox_identityapp',
  });
});

RegisterNuiCallback('getShared', (_: any, cb: Function) => {
  cb(Array.from(sharedDocuments.values()));
});

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
