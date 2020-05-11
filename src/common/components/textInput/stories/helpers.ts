import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

export const getCommonKnobs = () => {
  return {
    labelText: text('labelText', 'Label'),
    invalid: boolean('invalid', false),
    invalidText: text('invalidText', ''),
    onChange: action('onChange'),
    onBlur: action('onBlur'),
    placeholder: text('placeholder', ''),
    helperText: text('helperText', ''),
    disabled: boolean('disabled', false),
    tooltipText: text('tooltipText', ''),
    alternative: boolean('alternative', false),
    hideLabel: boolean('hideLabel', false),
    readOnly: boolean('readOnly', false),
    tooltipLabel: text('tooltipLabel', ''),
    tooltipCloseButtonLabelText: text('tooltipCloseButtonLabelText', ''),
    tooltipOpenButtonLabelText: text('tooltipOpenButtonLabelText', ''),
  };
};
