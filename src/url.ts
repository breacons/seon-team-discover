export const URL_MAIN = '/';
export const URL_SIGN_IN = '/sign-in';
export const URL_RESET_PASSWORD_REQUEST = '/reset-password';

export const URL_PROFILE = '/profile';

export const URL_CLIENT_LIST = '/clients';
export const URL_CLIENT_CREATE = '/clients/register';
export const URL_CLIENT_DETAILS = `${URL_CLIENT_LIST}/:clientId`;
export const URL_CLIENT_DETAILS_TAB = `${URL_CLIENT_DETAILS}/:tabId`;

export const URL_FAMILY_LIST = '/families';
export const URL_FAMILY_CREATE = `${URL_FAMILY_LIST}/register`;
export const URL_FAMILY_DETAILS = `${URL_FAMILY_LIST}/:familyId`;
export const URL_FAMILY_DETAILS_TAB = `${URL_FAMILY_DETAILS}/:tabId`;

export const getFamilyDetailsUrl = (familyId: string) =>
  URL_FAMILY_DETAILS.replace(':familyId', familyId);

export const getFamilyDetailTabUrl = (familyId: string, tabId: string) =>
  URL_FAMILY_DETAILS_TAB.replace(':familyId', familyId).replace(':tabId', tabId);


export const getClientDetailsUrl = (clientId: string) =>
  URL_CLIENT_DETAILS.replace(':clientId', clientId);

export const getClientDetailTabUrl = (clientId: string, tabId: string) =>
  URL_CLIENT_DETAILS_TAB.replace(':clientId', clientId).replace(':tabId', tabId);
