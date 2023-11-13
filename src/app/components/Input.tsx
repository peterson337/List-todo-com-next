'use client'
import React, {Fragment, useState, useEffect} from 'react'

export const Input = () => {
    const [description, setDescription] = useState<string>("");

    const submiting = async (e : any) => {
        e.preventDefault();
        try{
            const body = {description};
            const response = await fetch('https://list-todo-9hqo.onrender.com/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
                setDescription("");
        }catch (error) {
            console.log(error)    
        }



    }
  return (
    <Fragment>
    <section className='flex justify-center items-center mt-5 text-center flex-col gap-10'>
      <h2 className='text-center text-2xl'>List todo</h2>
      <form onSubmit={submiting} className='flex flex-row justify-center text-center gap-3'>
        <input
          type="text"
          className='w-60 md:w-[500px] mx-auto p-2 rounded-full text-black border-none outline-none'  // Centralize horizontalmente
          placeholder="Escreva uma tarefa"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='p-2 rounded-full bg-green-500'>Add Todo</button>
      </form>
    </section>
  </Fragment>
  
  )
}
