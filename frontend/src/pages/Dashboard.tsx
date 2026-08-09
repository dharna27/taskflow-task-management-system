import { useEffect, useState } from 'react'
import api from '../services/api'

interface Task {
    id: number
    title: string
    description: string
    status: string
    priority: string
}

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks')
                setTasks(response.data)
            } catch (err) {
                console.error(err)
                setError('Failed to load tasks.')
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    if (loading) {
        return (
            <div className="container mt-5">
                <p>Loading tasks...</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Task Dashboard</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && tasks.length === 0 && (
                <div className="alert alert-info">
                    You don't have any tasks yet.
                </div>
            )}

            <div className="row">
                {tasks.map((task) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {task.title}
                                </h5>

                                <p className="card-text">
                                    {task.description}
                                </p>

                                <span className="badge bg-primary me-2">
                  {task.status}
                </span>

                                <span className="badge bg-warning text-dark">
                  {task.priority}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard