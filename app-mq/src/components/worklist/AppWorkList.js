import React from 'react'
import Header from '../Header';
import TodoList from './components/TodoList';

const AppWorkList = () => {
    return (
        <div className="App">
            <Header />
            <TodoList />
        </div>
    );
}

export default AppWorkList;