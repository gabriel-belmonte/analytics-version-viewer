const PROVIDER_LIST = ["Sky", "Foxtel", "Orange", "Virgin Media"];
const ANALYTICS_ENV_LIST = ["sandbox", "dev", "qa", "prod", "Prod2"];

type ProviderUrls = { [x: string]: string[] };

const apiUrlGenerator = (providers: string[], envs: string[]): ProviderUrls => {
  const finalProviderURls: ProviderUrls = {};

  providers.forEach((provider) => (finalProviderURls[provider] = []));

  Object.keys(finalProviderURls).forEach((provider) =>
    envs.forEach((env) => {
      finalProviderURls[provider] = [
        ...finalProviderURls[provider],
        `api/utag?provider=${provider
          .toLowerCase()
          .replace(" ", "")}&env=${env}`,
      ];
    })
  );

  return finalProviderURls;
};

export const apiProviderUrls = apiUrlGenerator(
  PROVIDER_LIST,
  ANALYTICS_ENV_LIST
);
export const providerUrls = apiUrlGenerator(PROVIDER_LIST, ANALYTICS_ENV_LIST);

export const utagRegex = /utag.loader.*?,/g;
export const vtgRegex = /getVersion\(\)\{(.*?)\}/g;
export const utf8Decoder = new TextDecoder("utf-8");

export const getGithubUrl = (provider: string): string => {
  return `https://github.com/cbsi-cdmdigmops/Tealium_Entertainment/blob/master/pplusintl/tracking-config/pplusintl-temp-${provider}.js`;
};

export const getFileUrl = (provider: string, env: string): string => {
  return ` https://tags.tiqcdn.com/utag/cbsi/pplusintl-${provider}/${env}/utag.js`;
};

export const getAnalyticsEnv = (baseUrl: string): string => {
  return baseUrl?.split("env=").at(-1) || "";
};

export const getProvider = (baseUrl: string): string => {
  return baseUrl?.split("&").at(0)?.split("=").pop() || "";
};
