import { useState, useRef } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)

            if (emailRef.current.value.length > 40 || passRef.current.value.length > 30) {
                setLoading(false)
                return setError('Email Address or Password is too long.')
            }

            await login(emailRef.current.value, passRef.current.value)
                .then(() => {
                    navigate('/')
                })
                .catch((error) => {
                    setError(error.message.slice(9))
                })
        } catch {
            setError('Failed to Log In.')
        }

        setLoading(false)
    }

    return (
        <>
            <Container className='mt-5' style={{ maxWidth: 500 }}>
                <h1 className='mb-5'>Login</h1>
                { error && <Alert variant='danger'>{error}</Alert> }

                <Form className='mb-3' onSubmit={handleSubmit}>
                    <Form.Group className='mb-4'>
                        <Form.Text className='text-muted'>Email Address</Form.Text>
                        <Form.Control type='email' ref={emailRef} required maxLength='40' placeholder='example@email.com' />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <Form.Text className='text-muted'>Password</Form.Text>
                        <Form.Control type='password' ref={passRef} required maxLength='30' placeholder='password123' />
                    </Form.Group>

                    <Button disabled={loading} variant='primary' type='submit' className='w-100'>Login</Button>
                </Form>

                <Link to='/signup'>Don't have an account? Sign up.</Link>
            </Container>
        </>
    )
}