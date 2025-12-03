import React from 'react'
// <<<<<<< HEAD
import { useState } from 'react'

function NewArrivals() {

  const [currValue, setCurrValue] = useState("");
  const [ tasks, setTasks ] = useState([]);
  // const [index, setIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(currValue);
    // const [...setTasks, currValue]
    // console.log(e.target.value)
    if(!currValue.trim()) return;  
    setTasks((tasks) => [...tasks,
      // {id: index + 1, title: currValue}
      // {id: 0 + 1, title: currValue}
      { title: currValue}
    ])
    // console.log(tasks.title)
    console.log(tasks)
    // make input bar empty after submit
    setCurrValue('')
  }

  const handleDelete = (taskTitle) => {
    console.log(taskTitle)

    const filtered = tasks.filter(f => 
      f.title !== taskTitle
    )
    console.log(filtered)
    setTasks(filtered)
  }

  return (
    // <div>NewArrivals</div>

    <div className='p-7'>
      <h1>To do list </h1>
      <form onSubmit={handleSubmit}>
        <input
          className='outline-2'
          type="text"
          value={currValue}
          onChange={(e) => setCurrValue(e.target.value.toLowerCase())}
        />

        <button type='submit'>Add todo</button>

      </form>

      {/* <div>{tasks.map((task,i))}
        <div key={task.id}>
          {task.title}
          <button>delete</button>
        </div>
      </div> */}
      <div className='p-2'>{tasks?.map((task,i) => (
        // <div key={task.id}>
        <div key={i}>
          <div className='flex gap-2 my-3'>
            <p>{task.title}</p>
            <button className='bg-red-300' onClick={(e) => handleDelete(task.title)}>delete</button>
          </div>
        </div>  
      ))}</div>
    </div>
  );
// =======

// function NewArrivals() {
//   return (
//     <div>NewArrivals</div>
//   )
// >>>>>>> origin/main
}

export default NewArrivals