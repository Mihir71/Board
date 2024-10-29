import React from "react";
import "./board.css"; 
import Backlog from '../assets/icons_FEtask/Backlog.svg';
import Todo from '../assets/icons_FEtask/To-do.svg';
import InProgress from '../assets/icons_FEtask/in-progress.svg';
import Done from '../assets/icons_FEtask/Done.svg';
import Cancelled from '../assets/icons_FEtask/Cancelled.svg';
import add from '../assets/icons_FEtask/add.svg';
import threedot from '../assets/icons_FEtask/3 dot menu.svg';
import M from '../assets/icons_FEtask/M.jpg';
import ClosedCircle from '../assets/icons_FEtask/cloesdcircle.jpg'; 
import UrgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg';
import HighIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import MediumIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import LowIcon from '../assets/icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg';

const ProjectBoard = ({ orderBy, tasks, users }) => {
  const columns = [
    { title: "Backlog", icon: Backlog, status: "Backlog" },
    { title: "Todo", icon: Todo, status: "Todo" },
    { title: "In Progress", icon: InProgress, status: "In progress" },
    { title: "Done", icon: Done, status: "Done" },
    { title: "Canceled", icon: Cancelled, status: "Canceled" },
  ];

  const getUserAvatar = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? M : "/api/placeholder/30/30";
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
      default:
        return NoPriorityIcon;
    }
  };

  // Sort tickets based on orderBy (priority or title)
  const sortedTickets = [...tasks].sort((a, b) => {
    if (orderBy === 'priority') {
      return b.priority - a.priority; 
    } else if (orderBy === 'title') {
      return a.title.localeCompare(b.title); 
    }
    return 0;
  });

  return (
    <div className="project-board">
      {columns.map((column) => {
        const columnTasks = sortedTickets.filter(ticket => ticket.status === column.status);
        return (
          <div key={column.title} className="column">
            <div className="column-header">
              <div className="flex items-center gap-2">
                <img src={column.icon} alt={`${column.title} icon`} className="column-icon" />
                <span className="column-title">{column.title}</span>
                <span className="column-count">{columnTasks.length}</span>
              </div>
              <div className="button-container">
                
                {column.title !== "Canceled" && (
                  <>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <img src={add} alt="Add" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <img src={threedot} alt="More" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {columnTasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div>
                      <div className="task-id">{task.id}</div>
                      <div className="task-title">{task.title}</div>
                    </div>
                    <div className="user-avatar-container">
                      <img src={getUserAvatar(task.userId)} alt="Avatar" className="avatar" />
                      <div className={`availability-indicator ${users.find(user => user.id === task.userId)?.available ? 'available' : 'not-available'}`} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 priority-container">
                    <img src={getPriorityIcon(task.priority)} alt="Priority icon" className="priority-icon" />
                    <div className="task-tag-container">
                      <img src={ClosedCircle} alt="Closed circle" className="closed-circle-icon" />
                      <span className="task-tag">{task.tag.join(", ")}</span>
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

export default ProjectBoard;
