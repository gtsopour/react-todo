import Todo from './Todo';
import { findIndex } from 'lodash';

export default class TodoDataInterface {
    constructor() {
        this.todos = [];
        this.getFromLocalStorage();
    }

    setToLocalStorage() {
        if (window.localStorage && this.todos) {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }

    getFromLocalStorage() {
        if (window.localStorage) {
            let todos = localStorage.getItem('todos');
            if (todos) {
                this.todos = JSON.parse(todos);
            }
        }
    }

    addTodo(descriptionText) {
        const newTodo = new Todo(descriptionText);
        this.todos.push(newTodo);
        this.setToLocalStorage();
        return newTodo;
    }

    completeTodo(id) {
        const index = findIndex(this.todos, (todo) => todo.id === id);
        if (index > -1) {
            this.todos[index].isDone = !this.todos[index].isDone
        }
        this.setToLocalStorage();
    }

    removeTodo(id) {
        const index = findIndex(this.todos, (todo) => todo.id === id);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
        this.setToLocalStorage();
    }

    getAllTodos() {
        return this.todos.map(todo => todo);
    }
}