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
            oblik: podaci.get('oblik'),
            cijena: parseFloat(podaci.get('cijena')),
            datumUgradnje: new Date(podaci.get('datumUgradnje')).toISOString(),
            sank: podaci.get('sank') === 'on'
        })
    }

    return (
        <>
            <h3>
                Unos nove kuhinje
            </h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>
{/* dodati preostala svojstva */}
                <Form.Group controlId="oblik">
                    <Form.Label>Oblik</Form.Label>
                    <Form.Control type="text" name="oblik" required />
                </Form.Group>
                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="text" name="cijena" required />
                </Form.Group>
                <Form.Group controlId="datumUgradnje">
                    <Form.Label>Datum Ugradnje</Form.Label>
                    <Form.Control type="date" name="datumUgradnje" required />
                </Form.Group>
                <Form.Group controlId="sank">
                   <Form.Check label="Šank" name="sank" />
                </Form.Group>
                
                
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