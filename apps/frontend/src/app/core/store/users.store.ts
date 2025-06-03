import { inject } from "@angular/core";
import { User, UsersResponseDto } from "../../shared/models/users-response.model"
import { patchState, signalState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { UsersService } from "../providers/users.service";
import { TodosApiResponse, Todo } from "../../shared/models/todos-response.model";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of, delay } from 'rxjs';
import { TodosService } from "../providers/todos.service";

export type UsersTableState = {
    pageSize: number;
    activePage: number;
}

export const UsersTableState = signalState<UsersTableState>({
    activePage: 0,
    pageSize: 5
});

export type UserTasksState = {
    selectedUser: User | null;
    todos: TodosApiResponse;
    loading: boolean;
    error: string | null;
    // Optional: Cache todos for multiple users
    todosCache: Record<number, TodosApiResponse>;
}

const initialState: UserTasksState = {
    selectedUser: null,
    // todos: { limit: 0, skip: 0, total: 0, data: [] },
    todos: { limit: 0, skip: 0, total: 0, todos: [] as any },
    loading: false,
    error: null,
    todosCache: {}
};

export const UsersTasksStore = signalStore(
    { providedIn: 'root' },
    withState<UserTasksState>(initialState),
    withMethods((store) => {
        const usersService = inject(UsersService);
        const todosService = inject(TodosService);

        // Using rxMethod for better reactive handling
        const loadUserTasks = rxMethod<number>(
            pipe(
                tap(() => patchState(store, {
                    loading: true, error: null
                })),
                switchMap((userId) =>
                    todosService.getUserTasks$(userId).pipe(delay(1000)).pipe(
                        tap((todos: TodosApiResponse) => {
                            patchState(store, {
                                todos,
                                loading: false,
                                error: null,
                                // Cache the todos for this user
                                todosCache: { ...store.todosCache(), [userId]: todos }
                            });
                            console.log('User tasks loaded:', store.todos());
                        }),
                        catchError((err) => {
                            console.error('Failed to load user tasks', err);
                            patchState(store, {
                                loading: false,
                                error: 'Failed to load user tasks'
                            });
                            return of(null);
                        })
                    )
                )
            )
        );

        return {
            loadUserTasks,
            // Method to set selected user and automatically load their tasks
            setSelectedUser(user: User) {
                patchState(store, { selectedUser: user });
                console.log('Selected user:', user);

                // Check cache first
                const cachedTodos = store.todosCache()[user.id];
                if (cachedTodos) {
                    patchState(store, { todos: cachedTodos });
                } else {
                    // Load fresh data if not cached
                    loadUserTasks(user.id);
                }
            },

            // Method to refresh current user's tasks
            refreshCurrentUserTasks() {
                const currentUser = store.selectedUser();
                if (currentUser?.id) {
                    console.log('refreshCurrentUserTasks', currentUser.id);
                    loadUserTasks(currentUser.id);
                }
            },



            // Method to update a specific todo (optimistic update)
            // updateTodo(todoId: number, updates: Partial<Todo>) {
            //     const currentTodos = store.todos();
            //     const updatedData = currentTodos.data.map((todo:Todo[]) =>
            //         todo.id === todoId ? { ...todo, ...updates } : todo
            //     );

            //     patchState(store, {
            //         todos: { ...currentTodos, data: updatedData }
            //     });
            // },

            // Method to clear cache for a specific user
            clearUserCache(userId: number) {
                const cache = { ...store.todosCache() };
                delete cache[userId];
                patchState(store, { todosCache: cache });
            },

            // Method to clear all data
            reset() {
                patchState(store, initialState);
            }
        };
    }),
    withHooks({
        onInit(store) {
            // Optionally load data for a default user
            // You might want to get this from route params or user preferences
            const usersService = inject(UsersService);
            const todosService = inject(TodosService);
            todosService.getUserTasks$(1).subscribe({
                next: (todos: TodosApiResponse) => {
                    patchState(store, {
                        todos,
                        loading: false,
                        error: null,
                        // Cache the todos for this user
                        todosCache: { ...store.todosCache(), [1]: todos }
                    });
                },
                error: (err: any) => {
                    console.error('Failed to load default user tasks', err);
                    patchState(store, {
                        loading: false,
                        error: 'Failed to load default user tasks'
                    });
                }
            })

            console.log('UsersTasksStore initialized');
        }
    })
);