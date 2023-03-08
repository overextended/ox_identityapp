import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';
import type { SharedDocument, ServerIdentityData } from '../typings/documents';

const sharedDocuments = new Map<number, SharedDocument>();

// TODO: Refactor
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
    appId: 'IDENTITY',
    content: `${data.firstName} ${data.lastName} shared a document with you!`,
    keepOpen: false,
    duration: 8000, // Doesn't seem to work?
    path: '/identity/shared',
  });
});

onNet(
  'ox_identityapp:addDocument',
  (data: { userId: number; firstName: string; lastName: string; name: string; issued: string }) => {
    console.log(JSON.stringify(data, null, 2));
    const sharedDocument = sharedDocuments.get(data.userId);
    if (!sharedDocument) {
      sharedDocuments.set(data.userId, {
        firstName: data.firstName,
        lastName: data.lastName,
        shareTime: Date.now(),
        documents: [{ type: 'license', name: data.name, issued: data.issued }],
      });
    } else {
      const documents = sharedDocument.documents;
      const index = documents.findIndex((document) => document.type === 'license' && document.name === data.name);

      if (index !== -1) return;

      documents.push({ type: 'license', name: data.name, issued: data.issued });
      sharedDocuments.set(data.userId, { ...sharedDocuments.get(data.userId), documents });
    }
  }
);

RegisterNuiCallback('getShared', (_: any, cb: Function) => {
  cb(Array.from(sharedDocuments.values()));
});

RegisterNuiCallback('shareIdentity', async (id: number, cb: Function) => {
  const success = await triggerServerCallback<boolean>('ox_identityapp:shareIdentity', null, id);
  cb(success);
});

RegisterNuiCallback('shareDocument', async (data: { id: number; document: string }, cb: Function) => {
  const success = await triggerServerCallback<boolean>('ox_identityapp:shareDocument', null, data);
  cb(success);
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
