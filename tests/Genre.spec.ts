import { test, expect } from '../fixtures/baseTest';

const invalidId = 198929;
 let body: any = null;

test.beforeAll(async ({ genres }) => {
    const genre = await genres.create({ name: 'Comedy' });
    body = await genre.json();
})

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
    test('Get Genre By valid ID', async ({ genres }) => {
        const byId = await genres.getById(body.id);
        const bodyById = await byId.json();
        expect(bodyById.name).toBe('Comedy');
    })

    test('Get Genre By invalid ID', async ({ genres }) => {
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

test.describe('Update Genres Scenararios', () => {

    test('Update Genre Happy Path', async ({ genres }) => {
        const updatedGenre = await genres.update(body.id, { name: "Genre Updated" });
        const response = await updatedGenre.json();
        expect(updatedGenre.status()).toBe(200);
        expect(response.name).toBe('Genre Updated');
    })

    test('Update Genre with invalid ID', async ({ genres }) => {
        const updatedGenre = await genres.update(invalidId, { name: "Invalid update" })
        const response = await updatedGenre.json();
        expect(updatedGenre.status()).toBe(404);
        expect(response.error).toBe('Not Found');
        expect(response.message).toBe(`Genre with the ID: ${invalidId} not found!`);
    })

    test('Update Genre with empty name', async ({ genres }) => {
        const invalidId = 198929;
        const updatedGenre = await genres.update(invalidId, { name: "" })
        const response = await updatedGenre.json();
        expect(updatedGenre.status()).toBe(400);
        expect(response.name).toBe('The genre name cannot be empty or null.');
    })

})

test.describe('Delete Genres Scenararios', () => {
    test('Delete Genre Happy Path', async ({ genres }) => {
        const deleteGenre = await genres.delete(body.id);
        const response = await deleteGenre.json();
        expect(deleteGenre.status()).toBe(200);
        expect(response.message).toBe('Genre deleted successfully!');
    })

    test('Delete Genre with invalid ID', async ({ genres }) => {
        const deleteGenre = await genres.delete(invalidId)
        const response = await deleteGenre.json();
        expect(deleteGenre.status()).toBe(404);
        expect(response.error).toBe('Not Found');
        expect(response.message).toBe(`Genre with the ID: ${invalidId} not found!`);
    })
})