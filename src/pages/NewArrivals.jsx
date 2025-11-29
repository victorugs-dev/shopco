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
    setTasks((tasks) => [...tasks,
      // {id: index + 1, title: currValue}
      // {id: 0 + 1, title: currValue}
      { title: currValue}
    ])
    // make input bar empty after submit
    setCurrValue('')
  }

  // const handleDelete = ()

  return (
    // <div>NewArrivals</div>

    <div>
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
      <>{tasks?.map((task,i) => (
        // <div key={task.id}>
        <div key={i}>
          <div className='flex gap-2'>
            <p>{task.title}</p>
            <button className='bg-red-300'>delete</button>
          </div>
        </div>  
      ))}</>
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