import { useState, useEffect } from 'react'
import {Container, Button, Alert, Card, Row, Col, Form} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
import { useDataStore } from "../contexts/DataContext";

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { data, fetchQuery, deleteData, loading } = useDataStore()
    const [delLoading, setDelLoading] = useState(false)
    const [rerender, setRerender] = useState(0)

    async function handleLogout() {
        try {
            setError('')
            await logout()
        } catch {
            setError('Failed to Log Out.')
        }
    }

    function togglePWD(child) {
        child.type === 'password' ? child.type = 'text' : child.type = 'password'
    }

    async function del(id) {
        try {
            setError()
            setMessage()
            setDelLoading(true)
            await deleteData(id)
            setMessage('Successfully deleted the item.')
            setRerender(rerender + 1)
        } catch {
            setError('Failed to delete the item.')
        }
        setDelLoading(false)
    }


    // Fetch the data through DataContext.js
    useEffect(() => {
        fetchQuery()
    }, [rerender])

    if (loading) {
        return (
            <Container className='mt-5'>
                <h3>Loading...</h3>
            </Container>
        )
    }

    return (
        <>
            <Container className='mt-5'>
                <div className="mb-5">
                    <div className='d-flex gap-3 align-items-center'>
                        <h1>Dashboard</h1>
                        <Button onClick={handleLogout} variant='warning' className='h-50'>Log Out</Button>
                        <Button onClick={() => { navigate('/new') }} variant='primary' className='h-50'>New</Button>
                    </div>
                    <div className="text-muted">Logged in as: {currentUser.email}</div>
                </div>

                { message && <Alert variant='success'>{message}</Alert> }
                { error && <Alert variant='danger'>{error}</Alert> }

                <Row className='row'>
                    {
                        data.docs.map(item => {
                            return (
                                <Col key={item.id} className='p-2' xs={12} md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{item.data().service}</Card.Title>
                                            <Card.Text className='d-flex gap-2'>
                                                <Form.Control
                                                    disabled
                                                    type='password'
                                                    value={item.data().password}
                                                />

                                                { /* the event var in the onClick event would sometimes refer to
                                                the icon instead of the button */ }

                                                <Button variant='success' onClick={(e) =>
                                                    togglePWD(e.target.parentNode.children[0])
                                                }>
                                                    <i className="bi bi-eye" onClick={(e) =>
                                                        togglePWD(e.target.parentNode.parentNode.children[0])
                                                    }></i>
                                                </Button>

                                                <Button disabled={delLoading} variant='danger' onClick={() => {
                                                    del(item.id)
                                                }}>
                                                    <i className="bi bi-trash3"></i>
                                                </Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}