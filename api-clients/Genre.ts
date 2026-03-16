import { BaseClient } from "./BaseClient";

interface Genre {
    name: string;
}

export class GenreClient extends BaseClient<Genre>{
    constructor(request: any) {
        super(request, "/api/v1/genres");
    }
}