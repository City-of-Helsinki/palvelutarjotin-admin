/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../domain/app/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
