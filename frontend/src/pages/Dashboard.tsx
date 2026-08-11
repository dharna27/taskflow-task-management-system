import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import api from '../services/api'

interface Task {
    id: number
    title: string
    description: string
    status: string
    priority: string
}

interface PageResponse {
    content: Task[]
    totalPages: number
    totalElements: number
    number: number
}

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('TODO')
    const [priority, setPriority] = useState('MEDIUM')

    const [editingId, setEditingId] = useState<number | null>(null)
    const [creating, setCreating] = useState(false)

    const [searchTitle, setSearchTitle] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [paginationMode, setPaginationMode] = useState(false)

    const loadTasks = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await api.get('/tasks')

            setTasks(response.data)
            setPaginationMode(false)
            setTotalPages(0)
            setCurrentPage(0)
        } catch (err) {
            console.error(err)
            setError('Failed to load tasks.')
        } finally {
            setLoading(false)
        }
    }

    const loadPage = async (page: number) => {
        try {
            setLoading(true)
            setError('')

            const response = await api.get<PageResponse>(
                `/tasks/page?page=${page}&size=5`
            )

            setTasks(response.data.content)
            setCurrentPage(response.data.number)
            setTotalPages(response.data.totalPages)
            setPaginationMode(true)
        } catch (err) {
            console.error(err)
            setError('Failed to load paginated tasks.')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault()

        if (!searchTitle.trim()) {
            await loadTasks()
            return
        }

        try {
            setLoading(true)
            setError('')

            const response = await api.get(
                `/tasks/search?title=${encodeURIComponent(searchTitle)}`
            )

            setTasks(response.data)
            setPaginationMode(false)
            setTotalPages(0)
        } catch (err) {
            console.error(err)
            setError('Failed to search tasks.')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async (event: FormEvent) => {
        event.preventDefault()

        try {
            setCreating(true)
            setError('')

            await api.post('/tasks', {
                title,
                description,
                status,
                priority,
            })

            clearForm()
            await loadTasks()
        } catch (err) {
            console.error(err)
            setError('Failed to create task.')
        } finally {
            setCreating(false)
        }
    }

    const handleUpdate = async (event: FormEvent) => {
        event.preventDefault()

        if (editingId === null) {
            return
        }

        try {
            setError('')

            await api.put(`/tasks/${editingId}`, {
                title,
                description,
                status,
                priority,
            })

            clearForm()
            await loadTasks()
        } catch (err) {
            console.error(err)
            setError('Failed to update task.')
        }
    }

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this task?'
        )

        if (!confirmed) {
            return
        }

        try {
            setError('')

            await api.delete(`/tasks/${id}`)

            await loadTasks()
        } catch (err) {
            console.error(err)
            setError('Failed to delete task.')
        }
    }

    const startEditing = (task: Task) => {
        setEditingId(task.id)
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
        setPriority(task.priority)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const clearForm = () => {
        setEditingId(null)
        setTitle('')
        setDescription('')
        setStatus('TODO')
        setPriority('MEDIUM')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    useEffect(() => {
        loadTasks()
    }, [])

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <div className="dashboard-panel">
                        Loading TaskFlow...
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                {/* Header */}

                <header className="dashboard-header">

                    <div>
                        <h1 className="dashboard-title">
                            TaskFlow
                        </h1>

                        <p className="dashboard-subtitle">
                            Organize your work. Stay productive.
                        </p>
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </header>

                {/* Error */}

                {error && (
                    <div className="alert-custom alert-error">
                        {error}
                    </div>
                )}

                {/* Search */}

                <section className="dashboard-panel">

                    <h2 className="panel-title">
                        Search Tasks
                    </h2>

                    <form
                        className="search-row"
                        onSubmit={handleSearch}
                    >

                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search by task title..."
                            value={searchTitle}
                            onChange={(event) =>
                                setSearchTitle(event.target.value)
                            }
                        />

                        <button
                            className="button-primary"
                            type="submit"
                        >
                            Search
                        </button>

                        <button
                            className="button-secondary"
                            type="button"
                            onClick={() => {
                                setSearchTitle('')
                                loadTasks()
                            }}
                        >
                            Clear
                        </button>

                    </form>

                </section>

                {/* Create / Edit */}

                <section className="dashboard-panel">

                    <h2 className="panel-title">
                        {editingId === null
                            ? 'Create New Task'
                            : 'Edit Task'}
                    </h2>

                    <form
                        onSubmit={
                            editingId === null
                                ? handleCreate
                                : handleUpdate
                        }
                    >

                        <div className="task-form-grid">

                            <div className="task-form-full">

                                <label className="form-label-custom">
                                    Task Title
                                </label>

                                <input
                                    className="form-control-custom"
                                    type="text"
                                    placeholder="e.g. Complete project documentation"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="task-form-full">

                                <label className="form-label-custom">
                                    Description
                                </label>

                                <textarea
                                    className="form-control-custom"
                                    placeholder="Add some details about this task..."
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div>

                                <label className="form-label-custom">
                                    Status
                                </label>

                                <select
                                    className="form-control-custom"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                >

                                    <option value="TODO">
                                        To Do
                                    </option>

                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>

                                    <option value="DONE">
                                        Completed
                                    </option>

                                </select>

                            </div>

                            <div>

                                <label className="form-label-custom">
                                    Priority
                                </label>

                                <select
                                    className="form-control-custom"
                                    value={priority}
                                    onChange={(event) =>
                                        setPriority(event.target.value)
                                    }
                                >

                                    <option value="LOW">
                                        Low
                                    </option>

                                    <option value="MEDIUM">
                                        Medium
                                    </option>

                                    <option value="HIGH">
                                        High
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="form-actions">

                            <button
                                className="button-primary"
                                type="submit"
                                disabled={creating}
                            >
                                {editingId === null
                                    ? creating
                                        ? 'Creating...'
                                        : 'Create Task'
                                    : 'Update Task'}
                            </button>

                            {editingId !== null && (
                                <button
                                    className="button-secondary"
                                    type="button"
                                    style={{ marginLeft: '8px' }}
                                    onClick={clearForm}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </section>

                {/* Task List */}

                <section>

                    {tasks.length === 0 ? (

                        <div className="dashboard-panel">
                            No tasks found.
                        </div>

                    ) : (

                        <div className="tasks-grid">

                            {tasks.map((task) => (

                                <article
                                    className="task-card"
                                    key={task.id}
                                >

                                    <h3 className="task-title">
                                        {task.title}
                                    </h3>

                                    <p className="task-description">
                                        {task.description}
                                    </p>

                                    <div className="task-meta">

                                        <span className="badge-custom">
                                            {task.status}
                                        </span>

                                        <span className="badge-custom badge-priority">
                                            {task.priority}
                                        </span>

                                    </div>

                                    <div className="task-actions">

                                        <button
                                            className="button-edit"
                                            onClick={() =>
                                                startEditing(task)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="button-danger"
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

                {/* Pagination */}

                <div className="pagination-area">

                    {!searchTitle && !paginationMode && (
                        <button
                            className="button-secondary"
                            onClick={() => loadPage(0)}
                        >
                            View Paginated Tasks
                        </button>
                    )}

                    {paginationMode && totalPages > 0 && (
                        <>
                            <button
                                className="button-secondary"
                                disabled={currentPage === 0}
                                onClick={() =>
                                    loadPage(currentPage - 1)
                                }
                            >
                                ← Previous
                            </button>

                            <span className="page-info">
                                Page {currentPage + 1} of {totalPages}
                            </span>

                            <button
                                className="button-secondary"
                                disabled={
                                    currentPage >= totalPages - 1
                                }
                                onClick={() =>
                                    loadPage(currentPage + 1)
                                }
                            >
                                Next →
                            </button>
                        </>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Dashboard