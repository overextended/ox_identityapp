export type IDCard = {
  type: 'id';
  dob: string;
  gender: string;
};

export type LicenseCard = {
  type: 'license';
  name: string;
  label: string;
  issued: string;
};

export interface SharedDocument {
  firstName: string;
  lastName: string;
  shareTime: number;
  documents: Array<IDCard | LicenseCard>;
}

interface BaseServerData<T = unknown> {
  uid: number;
  type: T;
  firstName: string;
  lastName: string;
}

export interface ServerIdentityData extends BaseServerData<'id'> {
  gender: string;
  dob: string;
}

export interface ServerLicenseData extends BaseServerData<'license'> {
  name: string;
  issued: string;
}
