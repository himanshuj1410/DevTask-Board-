import React from 'react';
import { useNavigate } from 'react-router-dom';

const colorClasses = {
  blue: 'bg-blue-600',
  red: 'bg-red-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  pink: 'bg-pink-600',
  yellow: 'bg-yellow-600',
  indigo: 'bg-indigo-600',
};

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      {/* Color header */}
      <div className={`h-2 ${colorClasses[project.color] || colorClasses.blue}`}></div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description || 'No description'}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{project.tasks?.length || 0} tasks</span>
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Open Board
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
