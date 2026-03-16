export class BaseClient<T> {
    constructor(protected request: any, protected route: string) { }

    async create(payload: T) {
        return await this.request.post(this.route, { data: payload })
    }

    async getById(id: number | string) {
        return await this.request.get(`${this.route}/${id}`)
    }

    async getAll() {
        return await this.request.get(this.route)
    }

    async update(id: number | string, payload: T) {
        return await this.request.put(`${this.route}/${id}`, { data: payload })
    }

    async delete(id: number | string) {
        return await this.request.delete(`${this.route}/${id}`)
    }
}