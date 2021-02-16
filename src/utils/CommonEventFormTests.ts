import { addDays, format } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';

import { DATE_FORMAT } from '../common/components/datepicker/contants';
import { fireEvent, screen, userEvent, waitFor } from './testUtils';

export const runCommonEventFormTests = (
  renderForm: (currentDate: Date) => void
) => {
  describe('Common event form tests', () => {
    afterAll(() => {
      clear();
    });

    it('yesterday is not valid event start day', async () => {
      const currentDate = new Date('2008-08-01');
      advanceTo(currentDate);
      renderForm(currentDate);

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      const dateInput = screen.getByRole('textbox', { name: 'Päivämäärä' });
      userEvent.click(dateInput);
      userEvent.type(dateInput, format(addDays(currentDate, -1), DATE_FORMAT));
      fireEvent.blur(dateInput);
      await waitFor(() => {
        expect(dateInput).toBeInvalid();
      });
      expect(dateInput).toHaveAttribute('aria-describedby');
      expect(
        screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
      ).toBeInTheDocument();
    });

    it('today is valid event start day', async () => {
      const currentDate = new Date(2020, 7, 2);
      advanceTo(currentDate);
      renderForm(currentDate);

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      const dateInput = screen.getByRole('textbox', { name: 'Päivämäärä' });
      userEvent.click(dateInput);
      userEvent.type(dateInput, format(currentDate, DATE_FORMAT));
      fireEvent.blur(dateInput);
      await waitFor(() => {
        expect(dateInput).toBeValid();
      });
      expect(dateInput).not.toHaveAttribute('aria-describedby');
      expect(
        screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
      ).not.toBeInTheDocument();
    });
  });
};
