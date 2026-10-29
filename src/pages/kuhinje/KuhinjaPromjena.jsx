import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import KuhinjaService from "../../services/kuhinje/KuhinjaService";
import { useEffect, useState } from "react";


export default function KuhinjaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [kuhinja, setKuhinja] = useState({})
    const [sank, setSank] = useState(false)

    useEffect(()=>{
        ucitajKuhinja()
    },[])

    async function ucitajKuhinja(){
        await KuhinjaService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            setKuhinja(s)
            setSank(s.sank)
        })
    }
    

    async function promijeni(kuhinja) {
        await KuhinjaService.promijeni(params.sifra, kuhinja).then(()=>{
            navigate(RouteNames.KUHINJE)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            // završiti
            oblik: podaci.get('oblik'),
            cijena: parseFloat(podaci.get('cijena')),
            datumUgradnje: new Date(podaci.get('datumUgradnje')).toISOString(),
            sank: sank
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

                <Form.Group controlId="oblik">
                    <Form.Label>Oblik</Form.Label>
                    <Form.Control type="text" name="oblik" required 
                    defaultValue={kuhinja.oblik}/>
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="text" name="cijena" required
                    defaultValue={kuhinja.cijena} />
                </Form.Group>

                <Form.Group controlId="datumUgradnje">
                    <Form.Label>datumUgradnje</Form.Label>
                    <Form.Control type="text" name="datumUgradnje" required 
                    defaultValue={kuhinja.datumUgradnje}/>
                </Form.Group>

                <Form.Group controlId="sank" className="mt-3">
                    <Form.Check label="sank" name="sank" 
                    checked={sank} 
                    onChange={(e)=>{setSank(e.target.checked)}}/>
                </Form.Group>




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