import { triggerServerCallback } from '@overextended/ox_lib/client';
import { player } from '@overextended/ox_core/client';
import type { SharedDocument, ServerIdentityData, ServerLicenseData } from '../typings/documents';

const phoneNotify = (notisId: string, content: string, duration: number, path: string) =>
  global.exports.npwd.createNotification({
    notisId,
    appId: 'IDENTITY',
    content,
    keepOpen: false,
    duration: duration, // Doesn't seem to work?
    path,
  });

const sharedData = new Map<number, SharedDocument>();

onNet('ox_identityapp:addDocument', (data: ServerIdentityData | ServerLicenseData) => {
  const shared = sharedData.get(data.uid);
  if (!shared) {
    sharedData.set(data.uid, {
      firstName: data.firstName,
      lastName: data.lastName,
      shareTime: Date.now(),
      documents: [
        data.type === 'id'
          ? { type: 'id', gender: data.gender, dob: data.dob }
          : {
              type: 'license',
              label: GlobalState[`license.${data.name}`]?.label || 'NULL',
              name: data.name,
              issued: data.issued,
            },
      ],
    });

    return phoneNotify(
      'npwd:shareDocument',
      `${data.firstName} ${data.lastName} shared a document with you!`,
      8000,
      '/identity/shared'
    );
  }

  const documents = shared.documents;
  const documentIndex = documents.findIndex((document) =>
    data.type === 'id' ? document.type === 'id' : document.type === 'license' && document.name === data.name
  );

  if (documentIndex !== -1) return;

  documents.push(
    data.type === 'id'
      ? { type: 'id', gender: data.gender, dob: data.dob }
      : {
          type: 'license',
          name: data.name,
          label: GlobalState[`license.${data.name}`]?.label || 'NULL',
          issued: data.issued,
        }
  );
  sharedData.set(data.uid, { ...sharedData.get(data.uid), documents, shareTime: Date.now() });

  phoneNotify(
    'npwd:shareDocument',
    `${data.firstName} ${data.lastName} shared a document with you!`,
    8000,
    '/identity/shared'
  );
});

RegisterNuiCallback('getShared', (_: any, cb: Function) => {
  cb(Array.from(sharedData.values()));
});

RegisterNuiCallback('shareIdentity', async (id: number, cb: Function) => {
  const success = await triggerServerCallback<boolean>('ox_identityapp:shareIdentity', null, id);
  cb(success);
});

RegisterNuiCallback('shareDocument', async (data: { id: number; document: string }, cb: Function) => {
  const success = await triggerServerCallback<boolean>('ox_identityapp:shareDocument', null, data);
  cb(success);
});

RegisterNuiCallback('getLicenses', async (_: any, cb: Function) => {
  const licenses = await triggerServerCallback<Record<string, { issued: string }>>('ox:getLicense', null);
  if (!licenses) return cb(null);
  cb(
    Object.entries(licenses).map((license) => {
      const licenseName = license[0];
      const licenseValue = license[1];

      return [licenseName, { ...licenseValue, label: GlobalState[`license.${licenseName}`]?.label || 'NULL' }];
    })
  );
});

RegisterNuiCallback('getCharacter', (_: any, cb: Function) => {
  const gender = player?.get('gender');
  cb({
    firstName: player?.firstname,
    lastName: player?.lastname,
    dob: player?.get('dateofbirth'),
    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
  });
});
