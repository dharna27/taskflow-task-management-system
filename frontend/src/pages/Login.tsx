import { useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        setError('')

        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                {
                    email,
                    password,
                }
            )

            const token = response.data.token

            localStorage.setItem('token', token)

            navigate('/dashboard')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    'Invalid email or password.'
                )
            } else {
                setError('Something went wrong.')
            }
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    T
                </div>

                <h1 className="auth-title">
                    Welcome back
                </h1>

                <p className="auth-subtitle">
                    Sign in to continue to TaskFlow
                </p>

                {error && (
                    <div className="alert-custom alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-field">

                        <label className="auth-label">
                            Email
                        </label>

                        <input
                            className="auth-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="auth-field">

                        <label className="auth-label">
                            Password
                        </label>

                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Sign In
                    </button>

                </form>

                <div className="auth-link">
                    Don't have an account?{' '}
                    <Link to="/register">
                        Create one
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Login