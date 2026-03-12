import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { projectsAPI, tasksAPI } from '../api/client';
import useAuthStore from '../store/authStore';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';

const COLUMNS = {
  TODO: 'TODO',
  INPROGRESS: 'IN PROGRESS',
  DONE: 'DONE',
};

function KanbanBoard() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({
    TODO: [],
    INPROGRESS: [],
    DONE: [],
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchProjectAndTasks();
  }, [projectId]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      const projectResponse = await projectsAPI.getById(projectId);
      const tasksResponse = await tasksAPI.getByProject(projectId);

      setProject(projectResponse.data);

      const groupedTasks = {
        TODO: [],
        INPROGRESS: [],
        DONE: [],
      };

      tasksResponse.data.forEach((task) => {
        const status = task.status.toUpperCase().replace(/\s/g, '') === 'INPROGRESS' ? 'INPROGRESS' : task.status;
        if (groupedTasks[status]) {
          groupedTasks[status].push(task);
        }
      });

      setTasks(groupedTasks);
    } catch (error) {
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.create(projectId, taskData);
      const status = taskData.status || 'TODO';
      setTasks((prev) => ({
        ...prev,
        [status]: [response.data, ...prev[status]],
      }));
      setShowModal(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId, status) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(taskId);
        setTasks((prev) => ({
          ...prev,
          [status]: prev[status].filter((t) => t.id !== taskId),
        }));
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus && source.index === destination.index) {
      return;
    }

    const taskId = parseInt(draggableId);
    const task = tasks[sourceStatus][source.index];

    const newTasks = { ...tasks };
    newTasks[sourceStatus].splice(source.index, 1);
    newTasks[destStatus].splice(destination.index, 0, task);

    setTasks(newTasks);

    try {
      await tasksAPI.update(taskId, { status: destStatus });
      toast.success('Task updated successfully!');
    } catch (error) {
      // Revert on error
      fetchProjectAndTasks();
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{project?.title}</h1>
              {project?.description && <p className="text-sm text-gray-400">{project.description}</p>}
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedColumn('TODO');
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            + Add Task
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(COLUMNS).map(([key, title]) => (
              <div key={key} className="bg-dark-800 rounded-lg p-4 min-h-96">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  {title}
                  <span className="text-sm bg-dark-700 px-2 py-1 rounded text-gray-300">
                    {tasks[key].length}
                  </span>
                </h2>

                <Droppable droppableId={key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-80 rounded-lg p-2 transition ${
                        snapshot.isDraggingOver ? 'bg-dark-700' : ''
                      }`}
                    >
                      {tasks[key].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition ${
                                snapshot.isDragging
                                  ? 'opacity-50'
                                  : ''
                              }`}
                            >
                              <TaskCard
                                task={task}
                                onDelete={() => handleDeleteTask(task.id, key)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {tasks[key].length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No tasks yet</p>
                          <p className="text-sm">Drag tasks here or create new ones</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTask}
          defaultStatus={selectedColumn}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
