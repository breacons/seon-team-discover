import { Location } from 'history';
import { pickBy } from 'lodash';
import { parse, stringify } from 'query-string';
import history from '../../history';
import url from 'url';

export const replaceQueryParams = (location: string, search: any): string => {
  const parsedUrl = url.parse(location);

  const params = {
    ...parse(parsedUrl.search || ''),
    ...search,
  };

  return url.format({ ...parsedUrl, search: stringify(pickBy(params)) });
};

export const urlsHaveSameDomains = (one: string, two: string): boolean => {
  const parsedOneUrl = url.parse(one);
  const parsedTwoUrl = url.parse(two);
  return parsedOneUrl.host === parsedTwoUrl.host;
};

export const generateRedirectUrl = (currentUrl: string, redirectUrl: string): string => {
  return urlsHaveSameDomains(currentUrl, redirectUrl)
    ? replaceQueryParams(redirectUrl, { redirect: currentUrl })
    : replaceQueryParams(currentUrl, { redirect: null });
};

export const getRedirectUrlFromParams = (currentUrl: string): any => {
  const location = url.parse(currentUrl);
  const { redirect } = parse(location.search || '');

  if (redirect && urlsHaveSameDomains(currentUrl, redirect as any)) return redirect;

  return replaceQueryParams(currentUrl, { redirect: null });
};

export const getRedirectUrl = (redirect: string, location: Location | undefined) => {
  if (location) {
    const currentUrl = history.createHref({
      pathname: location.pathname,
      search: location.search,
    });

    return generateRedirectUrl(currentUrl, redirect);
  }

  return redirect;
};
