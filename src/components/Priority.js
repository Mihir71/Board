import React from "react";
import "./Priority.css"; 
import UrgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import HighIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import MediumIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import LowIcon from '../assets/icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg';
import Backlog from '../assets/icons_FEtask/Backlog.svg';
import Todo from '../assets/icons_FEtask/To-do.svg';
import InProgress from '../assets/icons_FEtask/in-progress.svg';
import Done from '../assets/icons_FEtask/Done.svg';
import Cancelled from '../assets/icons_FEtask/Cancelled.svg';
import add from '../assets/icons_FEtask/add.svg';
import threedot from '../assets/icons_FEtask/3 dot menu.svg'; 
import closedCircleIcon from '../assets/icons_FEtask/cloesdcircle.jpg'; 
import M from '../assets/icons_FEtask/M.jpg';

const PriorityBoard = ({ tickets, orderBy }) => {
 
    const priorityMap = {
        4: { name: "Urgent", icon: UrgentIcon },
        3: { name: "High", icon: HighIcon },
        2: { name: "Medium", icon: MediumIcon },
        1: { name: "Low", icon: LowIcon },
        0: { name: "No Priority", icon: NoPriorityIcon },
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


    const groupedTickets = {};
    tickets.forEach(ticket => {
        const priority = ticket.priority;
        if (!groupedTickets[priority]) {
            groupedTickets[priority] = [];
        }
        groupedTickets[priority].push(ticket);
    });

    return (
        <div className="priority-board">
            {Object.keys(groupedTickets).map(priorityKey => {
                const priority = parseInt(priorityKey);
                const tasks = groupedTickets[priority];
                const priorityInfo = priorityMap[priority];

                return (
                    <div key={priority} className="column">
                        <div className="column-header">
                            <div className="priority-icon-container">
                                <img src={priorityInfo.icon} alt={priorityInfo.name} className="priority-icon" />
                                <span className="priority-name">{priorityInfo.name}</span>
                                <span className="priority-task-count">{tasks.length}</span>
                            </div>
                            <div className="column-icons">
                                <img src={add} alt="Add" className="column-icon" />
                                <img src={threedot} alt="More options" className="column-icon" />
                            </div>
                        </div>

                        <div className="priority-task-list">
                            {sortTasks([...tasks]).map(task => (
                                <div key={task.id} className="task-card">
                                    <div className="task-id">{task.id}</div> 
                                    <div className="task-header">
                                        <img src={getStatusIcon(task.status)} alt={task.status} className="status-icon" />
                                        <div className="task-title">{task.title}</div> 
                                    </div>
                                    <img src={M} alt="Avatar" className="task-avatar" />
                                    <div className="task-footer">
                                        <div className="tag-container">
                                            <div className="closed-circle-container"> 
                                                <span className="closed-circle">
                                                    <img src={closedCircleIcon} alt="Closed Circle" />
                                                </span>
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

export default PriorityBoard;
