/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../domain/app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
