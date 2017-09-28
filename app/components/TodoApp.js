import React from 'react';
import TodoList from './TodoList';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.filters = ["ALL", "ACTIVE", "COMPLETED"];
        this.state = {
            todos: this.props.dataInterface.getAllTodos(),
            filter: "ALL"
        };
    }

    addTodo = () => {
        if (this.todoInput.value) {
            this.props.dataInterface.addTodo(this.todoInput.value);
            this.setState({todos: this.props.dataInterface.getAllTodos()});
            this.todoInput.value = '';
        }
    }

    completeTodo = todoId => {
        this.props.dataInterface.completeTodo(todoId);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
    }

    removeTodo = todoId => {
        this.props.dataInterface.removeTodo(todoId);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
    }

    changeFilter = filter => {
        this.setState({filter: filter});
    }

    visibleTodos = () => {
        switch (this.state.filter) {
            case "ALL":
                return this.state.todos;
            case "ACTIVE":
                return this.state.todos.filter(todo => todo.isDone === false);
            case "COMPLETED":
                return this.state.todos.filter(todo => todo.isDone === true);
            default:
                return this.state.todos;
        }
    }

    render() {
        let visibleTodos = this.visibleTodos();
        return (
            <div>
                <h2>Todo Application with React</h2>
                <input
                    type="text"
                    placeholder="What do you want todo?"
                    ref={(c => this.todoInput = c)}
                />
                <button onClick={this.addTodo}>Add</button>
                <TodoList
                    visibleTodos={visibleTodos}
                    filter = {this.state.filter}
                    completeTodo={this.completeTodo}
                    removeTodo={this.removeTodo}
                />
                <div>
                    {
                        this.filters.map(
                            filter =>
                                <button
                                    key={filter}
                                    onClick={() => this.changeFilter(filter)}>
                                        {filter}
                                </button>
                        )
                    }
                </div>

            </div>
        );
    }
}