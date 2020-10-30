// add "//" to the beginning of the url if protocol is missing.
const addUrlSlashes = (url: string): string => {
  const protocolRegex = /^((https?:\/\/)|(\/\/))/i;
  const urlIsMissingProtocol = !protocolRegex.test(url);
  return urlIsMissingProtocol ? `//${url}` : url;
};

export default addUrlSlashes;
