import React, { useEffect, useState, useRef } from "react";
import Nav from "./nav/nav";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import axiosInstance from "../axios";
import { Toaster, toast } from "sonner";

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // State to hold the tasks
  const [title, setTitle] = useState(""); // State to hold title input
  const [description, setDescription] = useState(""); // State to hold description input
  const socketRef = useRef(null); // useRef to keep track of the WebSocket instance
  const [alert, setAlert] = useState(false)


  const [editIndex, setEditIndex] = useState(null); // State to track the task being edited
  const [editTitle, setEditTitle] = useState("");   // State for the title being edited
  const [editDescription, setEditDescription] = useState(""); // State for the description being edited
  const [editId, setEditid] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index); // Set the task index to be edited
    setEditTitle(tasks[index].title);  // Initialize with current task title
    setEditDescription(tasks[index].description); // Initialize with current task description
  };
  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    // Fetch tasks from the API endpoint
    const fetchTasks = async () => {
      const response = await axiosInstance.get("tasks/");
      // const data = await response.json()
      console.log(response);
      setTasks(response.data); // Set the tasks in state
    };

    fetchTasks();

    // Initialize the WebSocket connection and store it in the ref
    socketRef.current = new WebSocket("ws://localhost:8000/ws/tasks/");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
    
        if (data.edit === true) {
          // Handle the task edit response
          console.log("Task edited successfully:", data.task);
          // Update the task in the state
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === data.task.id ? data.task : task
            )
          );
        } else if (data.complete === true) {
          
            toast.error('asdfasdf')
            fetchTasks();
          } 
          
          else if (data.edit === false) {
          // Handle the task creation response
          console.log("Task created successfully:", data.task);
          // Add the new task to the list
          setTasks((prevTasks) => [data.task, ...prevTasks]);
        } else if (data.delete === true) {
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== data.taskId));
        }  else if (data.message) {
          console.log(data.message); // Log general success messages
        }
      };
    

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [alert]); // Empty dependency array ensures this runs once on mount

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    // Create a new task object
    const newTask = { title, description };

    // Check if the WebSocket is still open and send the task data
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(newTask));
    } else {
      console.error("WebSocket is not open. Task not sent.");
    }

    // Reset the input fields
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) =>{
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({id: id, delete:true,title:'nothing',description:'nothing'}));
        toast.success('Deleted')
      }
  }
  const handleComplete = (id) =>{
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({id: id, complete:true, title:'nothing',description:'nothing'}));
        //toast.success('Marked as Completed')
        setAlert(!alert)
      }
  }
  const handleSave = (index) => {
    console.log(index)
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({id: index, title: editTitle, description: editDescription, edit:true, editId:editId }));
          toast.success('Edited Successfully')
        }
        setEditIndex(null);
  };

  const handleEdit = (id, index) =>{
    setEditid(id)
    handleEditClick(index)
  }


  const handleCancel = () => {
    setEditIndex(null); 
  };

  return (
    <div className="bg-black h-[100vh]">
        <div className="fixed">
        <Toaster position="top-right" richColors />
      </div>
      <div className="pl-7 pt-5 flex w-full">
        <Nav />
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-[#22ff22] font-serif p-4 text-xl">Create New Task</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title on change
                placeholder="Task Title"
                className="h-14 p-2 font-semibold focus:outline-none w-[400px] self-center rounded-md"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description on change
                placeholder="Task Description"
                className="h-40 p-2 rounded-md focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-[#32adff] p-3 rounded-md font-bold hover:bg-[#2375ac] hover:scale-105 duration-300"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="p-10 flex flex-col gap-2">
            <h1 className="text-[#faf626] font-semibold text-center">Pending Tasks</h1>
        {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white p-2 rounded flex gap-3 justify-between w-[400px]"
        >
          {editIndex === index ? (
            // Show the input fields when the edit button is clicked
            <div className="w-full">
              <div className="flex flex-col justify-center items-center">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)} // Update title input
                  className="border p-2 rounded w-full"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)} // Update description input
                  className="border p-2 rounded w-full mt-2"
                />
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={() => handleSave(index)} // Save the edited task
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel} // Cancel editing
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Show the task details when not editing
            <div className="w-full">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl text-center">{task.title}</h1>
                <p>{task.description}</p>
              </div>
            </div>
          )}

          {editIndex !== index && (
            <div className="flex items-center gap-2">
              <div
                className="hover:scale-110 duration-300"
                onClick={() => handleEdit(task.id, index)} // Open the edit form
              >
                <FaEdit size={15} color="blue" className="hover:cursor-pointer" />
              </div>
              <div className="hover:scale-110 duration-300"
                onClick={()=>handleDelete(task.id)}
              >
                <FaTrash size={15} color="red" className="hover:cursor-pointer" />
              </div>
              <div className="hover:scale-110 duration-300"
                onClick={()=>handleComplete(task.id)}
              >
                <FaCheck size={15} color="green" className="hover:cursor-pointer" />
              </div>
            </div>
          )}
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
