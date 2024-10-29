import React from "react";
import "./User.css"; 
import M from '../assets/icons_FEtask/M.jpg'; 
import Backlog from '../assets/icons_FEtask/Backlog.svg';
import Todo from '../assets/icons_FEtask/To-do.svg';
import InProgress from '../assets/icons_FEtask/in-progress.svg';
import Done from '../assets/icons_FEtask/Done.svg';
import Cancelled from '../assets/icons_FEtask/Cancelled.svg';
import add from '../assets/icons_FEtask/add.svg'; 
import threedot from '../assets/icons_FEtask/3 dot menu.svg';
import UrgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg';
import HighIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import MediumIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import LowIcon from '../assets/icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg';
import ClosedCircle from '../assets/icons_FEtask/cloesdcircle.jpg'; 

const UserBoard = ({ users, tickets, orderBy }) => {
   
    const getTasksForUser = (userId) => {
        return tickets.filter((ticket) => ticket.userId === userId);
    };

 
    const getUserAvatar = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? M : "/api/placeholder/30/30"; 
    };

    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Backlog':
                return Backlog;
            case 'Todo':
                return Todo;
            case 'In progress':
                return InProgress;
            case 'Done':
                return Done;
            case 'Cancelled':
                return Cancelled;
            default:
                return null; 
        }
    };

    
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 4:
                return UrgentIcon;
            case 3:
                return HighIcon;
            case 2:
                return MediumIcon;
            case 1:
                return LowIcon;
            case 0:
                return NoPriorityIcon;
            default:
                return null;
        }
    };


    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            if (orderBy === 'priority') {
                return b.priority - a.priority; 
            } else if (orderBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0; 
        });
    };

    return (
        <div className="user-board">
            {users.map((user) => {
                const userTasks = getTasksForUser(user.id);
                const sortedTasks = sortTasks([...userTasks]); 

                return (
                    <div key={user.id} className="column">
                        <div className="column-header">
                            <div className="user-avatar-container">
                                <img 
                                    src={getUserAvatar(user.id)} 
                                    alt={user.name} 
                                    className="avatar user-avatar" 
                                />
                                <span className="user-name">{user.name}</span>
                                <span className="user-task-count">{userTasks.length}</span>
                            </div>
                            <div className="column-icons">
                                <img src={add} alt="Add" className="column-icon" />
                                <img src={threedot} alt="More options" className="column-icon" />
                            </div>
                        </div>

                        <div className="user-task-list">
                            {sortedTasks.map((task) => (
                                <div key={task.id} className="task-card">
                                    <div className="task-id">{task.id}</div> 
                                    <div className="task-header">
                                        <img src={getStatusIcon(task.status)} alt={task.status} className="status-icon" />
                                        <div className="task-title">{task.title}</div> 
                                    </div>
                                    <div className="task-footer">
                                        <div className="tag-container">
                                            <div className="priority-circle">
                                                <img src={getPriorityIcon(task.priority)} alt="Priority" className="priority-icon" />
                                            </div>
                                            <div className="closed-circle-container">
                                                <img src={ClosedCircle} alt="Closed Circle" className="closed-circle" />
                                                <span className="task-tag">Feature Request</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserBoard;
