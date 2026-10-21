import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import KuhinjaService from "../../services/kuhinje/KuhinjaService";


export default function KuhinjaNovi() {

    const navigate = useNavigate()

    async function dodaj(kuhinja) {
        await KuhinjaService.dodaj(kuhinja).then(()=>{
            navigate(RouteNames.KUHINJE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            // završiti
        })
    }

    return (
        <>
            <h3>
                Unos novog kuhinje
            </h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                {/* dodati preostala svojstva */}

            

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KUHINJE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novi kuhinja
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}