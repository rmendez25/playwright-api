import {test as base} from '@playwright/test';
import { GenreClient } from '../api-clients/Genre';

type myFixtures = {
    genres: GenreClient
}

export const test = base.extend<myFixtures>({
    genres: async({request}, use) => {
        await use(new GenreClient(request));
    }
})

export {expect} from '@playwright/test';