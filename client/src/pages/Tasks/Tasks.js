import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Tasks.css"

function Tasks() {
 const [tasks, setTasks] = useState([]);
 const [newTask, setNewTask] = useState({ title: '', description: '' });
 const [isAdding, setIsAdding] = useState(false);
 const token = localStorage.getItem('token');
 const API_URL = process.env.REACT_APP_API_URL;

 useEffect(() => {
   fetchTasks();
 }, []);

 const fetchTasks = async () => {
   try {
     const response = await axios.get(`${API_URL}/tasks`, {
       headers: { Authorization: `Bearer ${token}` }
     });
     setTasks(response.data);
   } catch (error) {
     console.error('Error fetching tasks:', error);
   }
 };

 const createTask = async (e) => {
   e.preventDefault();
   try {
     await axios.post(`${API_URL}/tasks`, newTask, {
       headers: { Authorization: `Bearer ${token}` }
     });
     setNewTask({ title: '', description: '' });
     setIsAdding(false);
     fetchTasks();
   } catch (error) {
     console.error('Error creating task:', error);
   }
 };

 const updateTask = async (id, status) => {
   try {
     await axios.patch(`${API_URL}/tasks/${id}`, { status }, {
       headers: { Authorization: `Bearer ${token}` }
     });
     fetchTasks();
   } catch (error) {
     console.error('Error updating task:', error);
   }
 };

 const deleteTask = async (id) => {
   try {
     await axios.delete(`${API_URL}/tasks/${id}`, {
       headers: { Authorization: `Bearer ${token}` }
     });
     fetchTasks();
   } catch (error) {
     console.error('Error deleting task:', error);
   }
 };

 return (
   <div className="tasks-container">
     <button className="add-button" onClick={() => setIsAdding(true)}>
       + New Task
     </button>

     {isAdding && (
       <div className="modal">
         <div className="modal-content">
           <form onSubmit={createTask}>
             <input
               type="text"
               placeholder="Task Title"
               value={newTask.title}
               onChange={(e) => setNewTask({...newTask, title: e.target.value})}
             />
             <textarea
               placeholder="Description"
               value={newTask.description}
               onChange={(e) => setNewTask({...newTask, description: e.target.value})}
             />
             <div className="modal-buttons">
               <button type="submit">Create</button>
               <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
             </div>
           </form>
         </div>
       </div>
     )}

     <div className="tasks-grid">
       {tasks.map(task => (
         <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
           <div className="task-actions">
             <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
             <button 
               className="complete-btn" 
               onClick={() => updateTask(task.id, task.status === 'OPEN' ? 'CLOSED' : 'OPEN')}
             >
               ✓
             </button>
           </div>
           <h3>{task.title}</h3>
           <p>{task.description}</p>
           <div className={`task-status ${task.status.toLowerCase()}`}>
             {task.status}
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}

export default Tasks;