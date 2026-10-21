import { useEffect, useState } from "react"
import KuhinjaService from "../../services/kuhinje/KuhinjaService"
import { Button, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { NumericFormat } from "react-number-format"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function KuhinjaPregled() {

    const [kuhinje, setKuhinje] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        ucitajKuhinje()
    }, [])

    async function ucitajKuhinje() {
        await KuhinjaService.get().then((odgovor) => {
            //console.table(odgovor.data)
            setKuhinje(odgovor.data)
        })
    }

    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        await KuhinjaService.obrisi(sifra)
        ucitajKuhinje()
    }


    return (
        <>
            <Link to={RouteNames.KUHINJE_NOVI}
            className="btn btn-success w-100 my-3">
                Dodavanje nove kuhinje
            </Link>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Oblik</th>
                        <th>Cijena</th>
                        <th>Datum ugradnje</th>
                        <th>Šank</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {kuhinje && kuhinje.map((kuhinja) => (
                        <tr key={kuhinja.sifra}>
                            <td className="lead">{kuhinja.naziv}</td>
                            <td className="text-end">{kuhinja.oblik /* text-end dolazi iz bootstrap */}</td> 
                            <td className="desno">  {/* desno dolazi iz mog CSS-a */}
                                <NumericFormat
                                    value={kuhinja.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    suffix=' €'
                                    prefix='='
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <FormatDatuma datum={kuhinja.datumUgradnje} />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {/* {kuhinja.aktivan ? 'DA' : 'NE'} */}
                                {/* Primjer jedne ikone s različitom bojom u osnosu na boolean svojstvo */}
                                <GrValidate
                                    color={kuhinja.sank ? 'green' : 'red'}
                                    size={25}
                                />

                                {/* Primjer različitih ikona u osnosu na boolean svojstvo */}
                                {/*kuhinja.aktivan ? (
                                    <FcApproval size={25} />
                                ) : (
                                    <FcDisapprove size={25} />
                                )*/}

                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/kuhinje/${kuhinja.sifra}`)}}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(kuhinja.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <pre>
                {JSON.stringify(kuhinje,null,2)}
            </pre> */}

        </>
    )
}