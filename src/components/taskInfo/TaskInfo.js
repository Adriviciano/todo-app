import './TaskInfo.css';

//modificar para que se muestre un modal para
//editar la tarea que se clicka.

//lo que hace es crear una tarea nueva con las
//propiedades cambiadas y borrar la anterior.

//ademas hay que hacer que las tareas guarden 
//la prioridad y una descripcion, quitar el 
//boton de eliminar y que el postit solo tenga
//el nombre de la tarea.

//las tareas deben tener una opcion de completar
//que las tache con una X roja por encima de ellas.

export default function TaskInfo(props){
  return(
    <>
      {props.show && <div className="modal-background"></div>}
      {props.show && (
        <div className='modal'>
          <div className='modalTitle'>Add Task</div>
          <form onSubmit={''}>
            <div>
              <div>Name:</div>
              <input
                className='input'
                type="text"
                name="name"
                onChange={(e) => {
                  ''
                }}
              />
            </div>
            <div>
            <div>Priority:</div>
              <input
                className='priority'
                type="number"
                name="name"
                min={0}
                defaultValue={0}
                onChange={(e) => {
                  ''
                }}
              />
            </div>
            <button className='modalButton' type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}