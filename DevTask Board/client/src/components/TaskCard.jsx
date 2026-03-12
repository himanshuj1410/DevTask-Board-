import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const priorityColors = {
  low: 'bg-green-600 text-green-100',
  medium: 'bg-yellow-600 text-yellow-100',
  high: 'bg-red-600 text-red-100',
};

function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-dark-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition cursor-move">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-semibold flex-1 break-words">{task.title}</h4>
        <button
          onClick={onDelete}
          className="ml-2 text-gray-400 hover:text-red-400 transition text-lg"
        >
          ×
        </button>
      </div>

      {task.description && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${
          priorityColors[task.priority?.toLowerCase()] || priorityColors.medium
        }`}>
          {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1) || 'Medium'}
        </span>

        {task.dueDate && (
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
