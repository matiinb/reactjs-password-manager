import Container from 'react-bootstrap/Container';

export default function NoPage() {
    return (
        <>
            <Container className='mt-5'>
                <h1>404 Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
            </Container>
        </>
    )
}