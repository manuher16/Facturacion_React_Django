import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
const About = () => {
    const styleContainer = {
        "margin-top": "50px",
        "margin-bottom": "50px",
    };

    return (

        <Container style={styleContainer}>
            <Row >
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>Desarrollador</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Card.Text>
                                Orson Manuel Hernandez Ordoñez
                            </Card.Text>
                            <Card.Text>
                                Email: orson.manuel@gmail.com
                            </Card.Text>
                            <Card.Text>
                                Telefono: +(504) 8791-1345

                            </Card.Text>

                        </Card.Body>
                        <Card.Footer>
                            <form method="get" action="./Curriculum_Orson_Hernandez_Ordoñez.pdf">


                                <Button type="submit" variant="success">Obtener Curriculum</Button>
                            </form>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>

                            <Card.Title>Sobre Aplicacion</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Card.Text>
                                Aplicacion de facturacion
                            </Card.Text>
                            <Card.Text>
                                Backend: Django, SQLLite
                            </Card.Text>
                            <Card.Text>
                                Frontend: ReactJS, Bootstrap
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" href={process.env.REACT_APP_URL_REPO}>Ir Repositorio</Button>
                        </Card.Footer>
                    </Card></Col>
            </Row>
        </Container>

    )
}
export default About;