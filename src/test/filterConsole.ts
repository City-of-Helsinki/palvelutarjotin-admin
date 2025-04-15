const consoleLevels = ['debug', 'info', 'log', 'warn', 'error'] as const;

type ConsoleLevel = (typeof consoleLevels)[number];

const consoleMessagesToHide = {
  debug: [
    // Hide OrganisationStoragePersistor debug messages to declutter test output
    /^OrganisationStoragePersistor:(clear|load|save)/,
  ],
  info: [
    // Hide createCmsApolloClient function's cache messages to declutter test output
    /^Persisted cache has (been restored|expired)\./,
    // Hide organisation handling related info messages to declutter test output
    /^(First|Persisted) organisation set as active/,
    /^Active organisation (cleared and persistence removed|selected and persisted)/,
  ],
  log: [],
  warn: [
    // Hide Helsinki Design System's RadioButton warning from:
    // eslint-disable-next-line max-len
    // https://github.com/City-of-Helsinki/helsinki-design-system/blob/v3.5.0/packages/react/src/components/radioButton/RadioButton.tsx#L65
    /^Using ReactElement as a label is against good usability and accessibility practices./,
    // Hide organisation persisting related messages to declutter test output
    /^Persisted organisation ID not found in user's organisations/,
  ],
  error: [],
} as const satisfies Record<ConsoleLevel, RegExp[]>;

// Set up console method overrides to filter console messages
const filterConsole = () => {
  for (const consoleLevel of consoleLevels) {
    const hidablePatterns = consoleMessagesToHide[consoleLevel];
    if (hidablePatterns.length > 0) {
      // eslint-disable-next-line no-console
      const originalConsoleMethod = console[consoleLevel];
      // eslint-disable-next-line no-console
      console[consoleLevel] = function (msg, ...optionalParams) {
        const msgString = msg.toString();
        const shouldHide = hidablePatterns.some((pattern) =>
          pattern.test(msgString)
        );
        if (shouldHide) {
          return;
        }
        return originalConsoleMethod(msg, ...optionalParams);
      };
    }
  }
};

export default filterConsole;
