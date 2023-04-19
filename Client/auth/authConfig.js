const msalConfig = {
  auth: {
    clientId: '94411d90-3dac-47ab-9d45-84330b2fcbfb',
    authority: 'https://login.microsoftonline.com/8699b793-ef3e-474c-811e-5144f5ddfef2',
    redirectUri: import.meta.env.VITE_REDIRECT_CLIENT,
  },
};
export default msalConfig