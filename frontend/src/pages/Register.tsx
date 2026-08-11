import { useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        setMessage('')
        setError('')

        try {
            await axios.post(
                'http://localhost:8080/api/users/register',
                {
                    name,
                    email,
                    password,
                }
            )

            setMessage(
                'Registration successful! You can now login.'
            )

            setName('')
            setEmail('')
            setPassword('')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    'Registration failed. Please try again.'
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
                    Create your account
                </h1>

                <p className="auth-subtitle">
                    Start organizing your tasks with TaskFlow
                </p>

                {message && (
                    <div className="alert-custom alert-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="alert-custom alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-field">

                        <label className="auth-label">
                            Name
                        </label>

                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>

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
                            placeholder="Create a password"
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
                        Create Account
                    </button>

                </form>

                <div className="auth-link">
                    Already have an account?{' '}
                    <Link to="/">
                        Sign in
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Register