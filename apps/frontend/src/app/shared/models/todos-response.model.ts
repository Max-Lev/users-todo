import { ApiResponse } from "./users-response.model";

export interface Todo {
    completed: boolean;
    id: number;
    todo: string;
    userId: number;
}

export type TodosApiResponse = ApiResponse<Todo[]>;