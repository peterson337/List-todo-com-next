'use client'
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { ListType } from '../types/ListTypes';
import { Edit } from '../components/Edit';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';

export const List = () => {
  const [todos, setTodos] = useState<ListType[]>([]);
  const [isOpenModalEditarTarefa, setIsOpenModalEditarTarefa] = useState(false);
  const [armazenarId, setArmazenarId] = useState<number | null>(null);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos/');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const OpenModalEditarTarefa = async (id: number | null) => {
    setIsOpenModalEditarTarefa(true);
    setArmazenarId(id);
  };

  const deleteTodo = async (id: number | null) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos, deleteTodo]);

  return (
    <main
      className='flex  flex-col bg-white md:w-[400px] w-72 p-3 mt-5 h-60 md:h-96  rounded-xl overflow-auto mx-auto'
    >
      {isOpenModalEditarTarefa && (
        <Edit
          todos={todos}
          armazenarId={armazenarId}
          setIsOpenModalEditarTarefa={setIsOpenModalEditarTarefa}
          isOpenModalEditarTarefa={isOpenModalEditarTarefa}
        />
      )}

      {todos.length === 0 ? (
        <section>
          <p className='text-red-500 font-bold text-2xl'>Nenhuma tarefa encontrada.</p>
          <p className='text-black mt-3 text-2xl'>Escreva uma tarefa no input acima 👆 para aparecer aqui.</p>
        </section>
      ) : (
        todos.map((todo: ListType) => (
          <section
            key={todo.todo_id}
            className='flex flex-row justify-around items-center m-3 border-b border-dashed border-black pb-3 text-black md:gap-2'
          >
            <p className='break-words w-40'>{todo.description}</p>

            <button
              className='bg-red-500 p-2 rounded-full text-white shadow hover:bg-red-700'
              onClick={() => deleteTodo(todo.todo_id)}
            >
              <BiSolidTrashAlt className='text-2xl'></BiSolidTrashAlt>
            </button>

            <button
              onClick={() => OpenModalEditarTarefa(todo.todo_id)}
              className='bg-sky-500 text-white p-2 rounded-full hover:bg-sky-700'
            >
              <BsFillPencilFill className='text-2xl'></BsFillPencilFill>
            </button>
          </section>
        ))
      )}
    </main>
  );
};
