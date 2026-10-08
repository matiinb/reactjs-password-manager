import { useRef, useState } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
    const emailRef = useRef()
    const passRef = useRef()
    const passConfRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passRef.current.value !== passConfRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            setMessage('')
            setLoading(true)

            if (emailRef.current.value.length > 40 || passRef.current.value.length > 30) {
                setLoading(false)
                return setError('Email Address or Password is too long.')
            }

            await signup(emailRef.current.value, passRef.current.value)
                .then(() => {
                    setMessage('Successfully created a new account.')
                })
                .catch((error) => {
                    setError(error.message.slice(9))
                })
        } catch {
            setError('Failed to Sign Up.')
        }

        setLoading(false)
    }
    return (
        <>
            <Container className='mt-5' style={{ maxWidth: 500 }}>
                <h1 className='mb-5'>Sign Up</h1>
                { message && <Alert variant='success'>{message}</Alert> }
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

                    <Form.Group className='mb-4'>
                        <Form.Text className='text-muted'>Password Confirmation</Form.Text>
                        <Form.Control type='password' ref={passConfRef} required maxLength='30' placeholder='password123' />
                    </Form.Group>

                    <Button variant='primary' type='submit' className='w-100' disabled={loading}>Sign Up</Button>
                </Form>

                <Link to='/login'>Already got an account? Login.</Link>
            </Container>
        </>
    )
}