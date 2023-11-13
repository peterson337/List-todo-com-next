import React, {useState, Fragment, useEffect} from 'react'
export const Edit = ({todos, setIsOpenModalEditarTarefa, armazenarId} : any) => {


    useEffect(() => {
      
               todos.find((todo : any) => {
            if (todo.todo_id  ===  armazenarId) {
                setDescription(todo.description);
            }
        })
    }, [])
    
 
    const [description, setDescription] = useState<string>();

    const updateDescription = async (e : any) => {
        e.preventDefault();
        try{
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${armazenarId}`, {
                method: 'PUT',                
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            console.log(response);

            setIsOpenModalEditarTarefa(false);            
            
            // window.location = "/";
        }catch (error) {
            console.log(error)
            
        }
    }
  return (
    <Fragment>
        <section className={` fixed inset-0  flex justify-center items-center transition-colors
            ${setIsOpenModalEditarTarefa? ' visible bg-black/20' : ' invisible' }`}
          //  onClick={() => setIsOpenModalEditarTarefa(false)}
            >
            <section className={`bg-white rounded-lg shadow p-6 transition-all max-w-md fixed z-50 text-black 
            ${setIsOpenModalEditarTarefa? ' scale-100 opacity-100' : ' scale-1100 opacity-0'}`}>

                <button
                onClick={() => setIsOpenModalEditarTarefa(false)}
                className='flex justify-center items-center bg-red-600 p-2 rounded-full w-9 text-white hover:bg-red-800
                            ml-60 mb-4'>
                
                    X
                </button>
                
                <div className='justify-center items-center flex flex-col text-center gap-4'>

                <h2 className=' text-2xl'>Editar tarefa</h2>


                <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='text-black border border-[#ccc] h-11 pl-2 rounded-full'
                placeholder='Escerva uma algo para editar'
                />

                <span className=' space-x-5'>
                <button
                 onClick={(e) => updateDescription(e)}
                 className='bg-sky-600 p-2 rounded-full w-24 text-white hover:bg-sky-800'
                 >
                    Salvar
                </button>

                <button
                 onClick={() => setIsOpenModalEditarTarefa(false)}
                 className='bg-red-600 p-2 rounded-full w-24 text-white hover:bg-red-800'

                 >
                    Fechar
                </button>

                </span>

                </div>
            </section>
        </section>
    </Fragment>
  )
}
