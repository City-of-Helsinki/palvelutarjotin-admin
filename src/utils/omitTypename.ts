const omitTypenames = <T>(objectWithTypenames: T) => {
  const omitTypenameCb = (key: string, value: string) =>
    key === '__typename' ? undefined : value;

  // this could be typed correctly with deep omit
  // https://stackoverflow.com/questions/55539387/deep-omit-with-typescript
  const omittedObject: T = JSON.parse(
    JSON.stringify(objectWithTypenames),
    omitTypenameCb
  );

  return omittedObject;
};

export default omitTypenames;
