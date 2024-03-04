const Version = () => {
  // VITE_APP_VERSION is set by react
  const packageVersion = import.meta.env.VITE_APP_VERSION ?? '';
  const release = import.meta.env.VITE_APP_RELEASE ?? '';
  const commitHash = import.meta.env.VITE_APP_COMMITHASH ?? '';
  const buildTime = import.meta.env.VITE_APP_BUILDTIME ?? '';

  return JSON.stringify({
    status: 'ok',
    release,
    packageVersion,
    commitHash,
    buildTime,
  });
};

export default Version;
