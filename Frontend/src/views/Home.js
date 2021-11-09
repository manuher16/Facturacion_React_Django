import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
const Home = (props) => {
    const style = {
        width: '450px',
        height: 'auto',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)',
        "z-index": '999',
    }
    const styleContainer = {
        width: '100vw',
        height: '100vh',
    }
    return (
        <Container fluid style={styleContainer}>


            <Card style={style}>
                <Card.Img src="https://www.stupendo.co/blog/wp-content/uploads/2017/07/facturacion-digital.jpg" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Header>
                        <Card.Title>
                            <h3>Menu Inicio</h3>
                        </Card.Title>

                    </Card.Header>

                    <Card.Text>
                        <Button href="/facturacion">Facturar</Button>

                    </Card.Text>
                    <Card.Text>
                        <Button href="/historial">Historial</Button>
                    </Card.Text>

                </Card.ImgOverlay>

            </Card>



        </Container>

    )
}
export default Home;