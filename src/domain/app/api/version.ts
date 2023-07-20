
const Version = () => {
    // const packageVersion = process.env.APP_VERSION ?? '';
    // const release = process.env.NEXT_PUBLIC_RELEASE ?? '';
    // const commitHash = process.env.NEXT_PUBLIC_COMMITHASH ?? '';
    // const buildTime = process.env.BUILD_TIME ?? '';

    // res.status(200).json({
    //   status: 'ok',
    //   release,
    //   packageVersion,
    //   commitHash,
    //   buildTime,
    // });

    // REACT_APP_VERSION is set by react
    const packageVersion = process.env.REACT_APP_VERSION ?? '';
    const release = process.env.REACT_APP_RELEASE ?? '';
    const commitHash = process.env.REACT_APP_COMMITHASH ?? '';
    const buildTime = process.env.REACT_APP_BUILDTIME ?? '';

    console.log(process.env);
    return JSON.stringify({
        status: 'ok',
        release,
        packageVersion,
        commitHash,
        buildTime,
    });
};

export default Version;
