import { useState, useRef } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import { useDataStore } from "../contexts/DataContext";

export default function Login() {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [executing, setExecuting] = useState(false)
    const serviceRef = useRef()
    const passRef = useRef()
    const { addData } = useDataStore()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError()
            setMessage()
            setExecuting(true)

            if (serviceRef.current.value.length > 20 || passRef.current.value.length > 30) {
                setExecuting(false)
                return setError('Service Name or Password is too long.')
            }

            await addData(serviceRef.current.value, passRef.current.value)
            setMessage('Successfully added the new item.')
        } catch {
            setError('Failed to add a new item.')
        }
        setExecuting(false)
    }

    return (
        <>
            <Container className='mt-5' style={{ maxWidth: 500 }}>
                <h1 className='mb-5'>Add New</h1>
                { message && <Alert variant='success'>{message}</Alert> }
                { error && <Alert variant='danger'>{error}</Alert> }

                <Form className='mb-3' onSubmit={handleSubmit}>
                    <Form.Group className='mb-4'>
                        <Form.Text className='text-muted'>Service Name / URL</Form.Text>
                        <Form.Control type='text' ref={serviceRef} required maxLength='20' placeholder='https://google.com' />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <Form.Text className='text-muted'>Password</Form.Text>
                        <Form.Control type='password' ref={passRef} required maxLength='30' placeholder='password123' />
                    </Form.Group>

                    <Button disabled={executing} variant='primary' type='submit' className='w-100'>Add Item</Button>
                </Form>
            </Container>
        </>
    )
}