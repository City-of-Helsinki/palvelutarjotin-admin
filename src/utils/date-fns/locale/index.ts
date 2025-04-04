// This file is only for fixing TypeScript type checking issues
// with importing from date-fns/locale and date-fns in a single file.
import { enGB, fi } from 'date-fns/locale';

import sv from './sv';

export { enGB as en, fi, sv };
