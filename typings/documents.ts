export type IDCard = {
  type: 'id';
  dob: string;
  gender: string;
};

export type LicenseCard = {
  type: 'license';
  issued: string;
};

export interface SharedDocument {
  firstName: string;
  lastName: string;
  shareTime: number;
  documents: Array<IDCard | LicenseCard>;
}

export interface ServerIdentityData {
  uid: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
}
