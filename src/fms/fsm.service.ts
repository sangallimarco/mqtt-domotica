import {MachineContext} from "./fsm.config";

export function fetchTodos(ctx: MachineContext): Promise<Partial<MachineContext>> {
    return fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json());
}

export function removeTodo(ctx: MachineContext, id: number): Partial<MachineContext> {
    const {todos} = ctx;
    const filtered = todos.filter(todo => todo.id !== id);
    return {todos: filtered};
}
