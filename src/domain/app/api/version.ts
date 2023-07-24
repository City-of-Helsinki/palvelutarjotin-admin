
const Version = () => {
    // REACT_APP_VERSION is set by react
    const packageVersion = process.env.REACT_APP_VERSION ?? '';
    const release = process.env.REACT_APP_RELEASE ?? '';
    const commitHash = process.env.REACT_APP_COMMITHASH ?? '';
    const buildTime = process.env.REACT_APP_BUILDTIME ?? '';

    return JSON.stringify({
        status: 'ok',
        release,
        packageVersion,
        commitHash,
        buildTime,
    });
};

export default Version;
