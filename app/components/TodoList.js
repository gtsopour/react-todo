import React from 'react';
import TodoItem from './TodoItem'

export default class TodoList extends React.Component {
    render() {
        return (
            <div>
            <h3>{this.props.filter}</h3>
            {this.props.visibleTodos.length > 0?
                (
                    <ul>
                        {this.props.visibleTodos.map(
                            (todo) =>
                                <TodoItem
                                    key={todo.id}
                                    todoId={todo.id}
                                    text={todo.descriptionText}
                                    isDone={todo.isDone}
                                    completeTodo={this.props.completeTodo}
                                    removeTodo={this.props.removeTodo}
                                />
                        )}
                    </ul>
                ):
                (
                    <ul>
                        <li>No entries</li>
                    </ul>
                )
            }
            </div>
        );
    }
}