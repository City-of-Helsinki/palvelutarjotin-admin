function getOrError(variableName: string) {
  const variable = process.env[variableName];

  if (!variable) {
    throw new Error(`No ${variableName} specified.`);
  }

  return variable;
}

export const envUrl = (): string => getOrError('VITE_APP_ORIGIN');
