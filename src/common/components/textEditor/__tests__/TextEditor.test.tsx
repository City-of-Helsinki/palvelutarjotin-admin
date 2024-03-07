import React from 'react';
import { vi } from 'vitest';

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

/*
FIXME: Skipped because it does not work on Github.
FAIL src/common/components/textEditor/__tests__/TextEditor.test.tsx
  ● should call onChange
    TypeError: Cannot read property 'focus' of null
      at node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.js:7:210080
      at Timeout.task [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:391:19)
*/
test.skip('should call onChange', async () => {
  const onChange = vi.fn();
  renderComponent({ onChange });

  const editor = screen.getByRole('textbox', { name: label });

  pasteToTextEditor(editor, 'test');
  expect(onChange).toBeCalledWith('<p>test</p>\n');

  const undoButton = screen.getByTitle(/peruuta/i);
  await userEvent.click(undoButton);
  expect(onChange).toBeCalledWith('');
});
