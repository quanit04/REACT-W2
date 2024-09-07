import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';


const TodoList = () => {
  // State để lưu trữ danh sách công việc
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Hàm thêm công việc vào một cột cụ thể
  const addTask = (column) => {
    const taskName = prompt("Nhập việc cần làm:");
    if (taskName) {
      setTasks({
        ...tasks,
        [column]: [...tasks[column], { id: Date.now(), name: taskName }],
      });
    }
  };

  // Hàm chỉnh sửa công việc trong một cột cụ thể
  const editTask = (column, id) => {
    const newTaskName = prompt("Chỉnh sửa việc cần làm:");
    if (newTaskName) {
      setTasks({
        ...tasks,
        [column]: tasks[column].map(task => task.id === id ? { ...task, name: newTaskName } : task),
      });
    }
  };

  // Hàm xóa công việc trong một cột cụ thể
  const deleteTask = (column, id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa việc này?')) {
      setTasks({
        ...tasks,
        [column]: tasks[column].filter(task => task.id !== id),
      });
    }
  };

  // Hàm di chuyển công việc từ cột này sang cột khác
  const moveTask = (task, fromColumn, toColumn) => {
    setTasks(prevTasks => {
      const fromTasks = prevTasks[fromColumn].filter(t => t.id !== task.id); // Lọc công việc ra khỏi cột nguồn
      const toTasks = [...prevTasks[toColumn], task]; // Thêm công việc vào cột đích
      return { // cập nhật trạng thái
        ...prevTasks,
        [fromColumn]: fromTasks,
        [toColumn]: toTasks,
      };
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <h1 className="text-2xl font-bold text-black mb-8">Danh sách việc cần làm</h1>
      <div className="flex gap-4 w-full max-w-5xl">
        <Column
          title="Việc cần làm"
          tasks={tasks.todo}
          addTask={() => addTask('todo')}
          editTask={(id) => editTask('todo', id)}
          deleteTask={(id) => deleteTask('todo', id)}
          moveTask={(task) => moveTask(task, 'todo', 'inProgress')}
        />
        <Column
          title="Đang tiến hành"
          tasks={tasks.inProgress}
          addTask={() => addTask('inProgress')}
          editTask={(id) => editTask('inProgress', id)}
          deleteTask={(id) => deleteTask('inProgress', id)}
          moveTask={(task) => moveTask(task, 'inProgress', 'done')}
        />
        <Column
          title="Đã xong"
          tasks={tasks.done}
          addTask={() => addTask('done')}
          editTask={(id) => editTask('done', id)}
          deleteTask={(id) => deleteTask('done', id)}
          moveTask={(task) => moveTask(task, 'done', 'todo')}
        />
      </div>
    </div>
  );
};

// Component Column để hiển thị từng cột trong danh sách việc
const Column = ({ title, tasks, addTask, editTask, deleteTask, moveTask }) => (
  <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-1/3">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <span className="text-blue-600 bg-blue-100 rounded-full px-2 py-1 text-sm font-bold">{tasks.length}</span>
        <h2 className="ml-2 text-lg font-semibold">{title}</h2>
      </div>
      <button onClick={addTask} className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm hover:bg-blue-600">
        + Thêm
      </button>
    </div>
    <div className="bg-gray-50 rounded-lg flex-grow p-2">
      {tasks.map(task => (
        <div key={task.id} className="flex justify-between items-center bg-white shadow-sm rounded p-2 mb-2">
          <span>{task.name}</span>
          <div>
            <button onClick={() => editTask(task.id)} className="text-blue-500 hover:underline mr-2"><EditOutlined /></button>
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline mr-2"><DeleteOutlined /></button>
            <button
              onClick={() => moveTask(task)}
              className="text-green-500 hover:underline"
            >
              <ArrowRightOutlined />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TodoList;
