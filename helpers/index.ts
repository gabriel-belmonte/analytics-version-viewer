const PROVIDER_LIST = ['Sky', 'Foxtel', 'Orange', 'Virgin Media'];
const ANALYTICS_ENV_LIST = ['dev', 'qa', 'prod', 'Prod2'];

type ProviderUrls = { [x: string]: string[] };

const urlGenerator = (providers: string[], envs: string[]): ProviderUrls => {
  const finalProviderURls: ProviderUrls = {};

  providers.forEach((provider) => (finalProviderURls[provider] = []));

  Object.keys(finalProviderURls).forEach((provider) =>
    envs.forEach((env) => {
      finalProviderURls[provider] = [
        ...finalProviderURls[provider],
        `api/utag/cbsi/pplusintl-${provider
          .toLowerCase()
          .replace(' ', '')}/${env}/utag.js`,
      ];
    })
  );

  return finalProviderURls;
};

export const providerUrls = urlGenerator(PROVIDER_LIST, ANALYTICS_ENV_LIST);

export const utagRegex = /utag.loader.*?,/g;
export const vtgRegex = /getVersion\(\)\{(.*?)\}/g;
export const utf8Decoder = new TextDecoder('utf-8');

export const getGithubUrl = (provider: string): string => {
  return `https://github.com/cbsi-cdmdigmops/Tealium_Entertainment/blob/master/pplusintl/tracking-config/pplusintl-temp-${provider}.js`;
};

export const getAnalyticsEnv = (baseUrl: string): string => {
  return baseUrl?.split('/').at(-2) || '';
};

export const getProvider = (baseUrl: string): string => {
  return baseUrl?.split('/').at(-3)?.split('-').pop() || '';
};
