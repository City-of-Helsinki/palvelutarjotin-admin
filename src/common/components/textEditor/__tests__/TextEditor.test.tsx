import React from 'react';
import { vi } from 'vitest';
import { waitFor } from '@testing-library/react';

import {
  pasteToTextEditor,
  render,
  screen,
  userEvent,
} from '../../../../utils/testUtils';
import TextEditor, { TextEditorProps } from '../TextEditor';

const label = 'Text editor label';

const defaultProps: TextEditorProps = {
  id: 'text-editor-1',
  label,
  onBlur: vi.fn(),
  onChange: vi.fn(),
  value: '',
};

const renderComponent = (props?: Partial<TextEditorProps>) =>
  render(<TextEditor {...defaultProps} {...props} />);

test('should call onChange', async () => {
  const onChange = vi.fn();
  renderComponent({ onChange });

  const editor = await screen.findByRole('textbox', { name: label });

  pasteToTextEditor(editor, 'test');
  await waitFor(() => expect(onChange).toBeCalledWith('<p>test</p>\n'));

  const undoButton = await screen.findByTitle(/peruuta/i);
  await userEvent.click(undoButton);
  await waitFor(() => expect(onChange).toBeCalledWith(''));
});
