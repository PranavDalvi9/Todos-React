import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  const [toDoData, setToDoData] = useState([])
  const [doingdata, setDoingdata] = useState([])
  const [donedata, setDonedata] = useState([])

  useEffect(() => {

    // axios.get("http://localhost:2344/todos/Done").then((res) => setDonedata(res.data));

    // axios.get("http://localhost:2344/todos/To_Do").then((res) => setToDoData(res.data));

    // axios.get("http://localhost:2344/todos/Doing").then((res) => setDoingdata(res.data));
    dataDone();
    dataTodo();
    dataDoing();
  }, [])

  const dataDone = () => {
    axios.get("http://localhost:2344/todos/Done").then((res) => setDonedata(res.data));
  }
  const dataTodo = () => {
    axios.get("http://localhost:2344/todos/To_Do").then((res) => setToDoData(res.data));
  }
  const dataDoing = () => {
    axios.get("http://localhost:2344/todos/Doing").then((res) => setDoingdata(res.data));

  }

  const handleDoing = (e) => {
    axios.patch(`http://localhost:2344/todos/${e.target.value}`, {
      "task": "Doing"
    }).then(() =>{dataDoing() ;dataDone(); dataTodo() } )
    
  }

  const handleDone = (e) => {
    axios.patch(`http://localhost:2344/todos/${e.target.value}`, {
      "task": "Done"
    }).then(() => {dataDoing() ;dataDone(); dataTodo() })
    
  }

  const handleTODo = (e) => {
    axios.patch(`http://localhost:2344/todos/${e.target.value}`, {
      "task": "To Do"
    }).then(() => {dataDoing() ;dataDone(); dataTodo()})
    
  }

  const handleEdit = (e) => {
    // console.log(e.target.value)
    navigate(`/edit/${e.target.value}`)
  }

  return (
    <div className='HomePage'>

      <div className='MainTodo' >

        {/* Todo div start */}
        <div>
          <div className='TodoHeading'><p>To DO</p></div>

          {
            toDoData.length !== 0 ?
              <div>
                {
                  toDoData.map((e) => (
                    <div className='Card' key={e._id}>
                      <div className='cardstatus'><p>{e.task}</p></div>
                      <div className='CardTitle'><p>{e.title}</p></div>
                      <div className='CardDescription'><p>{e.description}</p></div>
                      <div className='CardButton'>
                        <button value={e._id} onClick={handleDoing}>Doing</button>
                        <button value={e._id} onClick={handleDone}>Done</button>
                      </div>
                      <div className='EditButton'><button value={e._id} onClick={handleEdit}>Edit</button></div>
                    </div>
                  ))
                }
              </div> :

              <h1>No Data Found</h1>
          }


        </div>

        {/* Doing div start */}
        <div>
          <div className='TodoHeading'><p>Doing</p></div>

          {
            doingdata.length !== 0 ?
              <div>
                {
                  doingdata.map((e) => (
                    <div className='Card' key={e._id}>
                      <div className='cardstatus'><p>{e.task}</p></div>
                      <div className='CardTitle'><p>{e.title}</p></div>
                      <div className='CardDescription'><p>{e.description}</p></div>
                      <div className='CardButton'>
                        {/* <button>Doing</button> */}
                        <button value={e._id} onClick={handleTODo}>To Do</button>
                        <button value={e._id} onClick={handleDone}>Done</button>
                      </div>
                      <div className='EditButton' ><button value={e._id} onClick={handleEdit}>Edit</button></div>
                    </div>
                  ))
                }
              </div> :
              <h1>No Data Found</h1>
          }



        </div>

        {/* Done div start */}
        <div>
          <div className='TodoHeading'><p>Done</p></div>

          {
            donedata.length !== 0 ?
              <div>
                {
                  donedata.map((e) => (
                    <div className='Card' key={e._id}>
                      <div className='cardstatus'><p>{e.task}</p></div>
                      <div className='CardTitle'><p>{e.title}</p></div>
                      <div className='CardDescription'><p>{e.description}</p></div>
                      <div className='CardButton'>
                        <button value={e._id} onClick={handleTODo}>To Do</button>
                        <button value={e._id} onClick={handleDoing}>Doing</button>
                      </div>
                      <div className='EditButton'><button value={e._id} onClick={handleEdit}>Edit</button></div>
                    </div>
                  ))
                }
              </div> :
              <h1>No Data Found</h1>
          }



        </div>
      </div>

    </div>
  )
}
