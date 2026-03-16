import { test, expect } from '../fixtures/baseTest';

test.describe('Create Genre scenarios', () => {
    test('Create Genre Happy Path', async ({ genres }) => {
        const genre = await genres.create({ name: 'Action' });
        const body = await genre.json()
        expect(genre.status()).toBe(201);
        expect(body.name).toBe('Action');
    })

     test('Create Genre without Name(Mandatory)', async ({ genres }) => {
        const genre = await genres.create({ name: '' });
        const body = await genre.json()
        expect(genre.status()).toBe(400);
        expect(body.name).toBe('The genre name cannot be empty or null.');
    })
})

test.describe('Get Genres test Cases', () => {
    let body: any = null;

    test.beforeEach(async ({ genres }) => {
        const genre = await genres.create({ name: 'Comedy' });
        body = await genre.json();
    })

    test('Get Genre By valid ID', async ({ genres }) => {
        const byId = await genres.getById(body.id);
        const bodyById = await byId.json();
        expect(bodyById.name).toBe('Comedy');
    })

    test('Get Genre By invalid ID', async ({ genres }) => {
        const invalidId = 198929;
        const byId = await genres.getById(invalidId);
        const bodyById = await byId.json();
        expect(bodyById.error).toBe('Not Found');
        expect(bodyById.message).toBe(`Genre with the ID: ${invalidId} not found!`);
    })

    test('Get All Genres', async ({ genres }) => {
        const genresList = await genres.getAll();
        const genresBody = await genresList.json();
        expect(genresBody.length).toBeGreaterThan(1);
    })
})