import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import KuhinjaService from "../../services/kuhinje/KuhinjaService";
import { useEffect, useState } from "react";


export default function KuhinjaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [kuhinja, setKuhinja] = useState({})

    useEffect(()=>{
        ucitajKuhinja()
    },[])

    async function ucitajKuhinja(){
        await KuhinjaService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setKuhinja(s)
        })
    }
    

    async function promijeni(kuhinja) {
        await KuhinjaService.promijeni(params.sifra, kuhinja).then(()=>{
            navigate(RouteNames.SMJEROVI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            // dodati kasnije
        })
    }

    return (
        <>
            <h3>
                Promjena kuhinju
            </h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={kuhinja.naziv}/>
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
                            Promijeni kuhinja
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}