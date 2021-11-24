import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const Pesquisa = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
`

type TUf = {
    id_minic: number,
    id_estad: number,
    ano: number,
    cob_vac_bcg: number,

}

const Mapa = (props: any) => {
    const { anos, estados, regioes } = props.data;
    const [features, setFeatures] = useState(regioes.data.features);
    const [state, setState] = useState(new Map());

    const [form, setForm] = useState({
        estado: 35,
        ano: 2019,
    })
    const [lastState, setLastState] = useState(NaN);
    console.count('didmount')

    useEffect(() => {
        async function getDados(uf: number) {
            const states = new Map();

            const res = await axios.get(`/api/dados?file=${uf}`);

            res.data.dados.forEach((uf: TUf) => {
                states.set(`${uf.id_minic} - ${uf.ano}`, uf)
            });

            setState(states);
            setLastState(form.estado)

        }

        async function getGeoJson(uf: number) {
            const res = await axios.get(`https://servicodados.ibge.gov.br/api/v3/malhas/estados/${uf}?formato=application/vnd.geo+json&qualidade=intermediaria&intrarregiao=municipio`);

            setFeatures(res.data.features);
            getDados(uf)
        }
        if(form.estado !== lastState){
            getGeoJson(form.estado)
        }

    }, [features, form.estado, lastState])

    const Poly = useCallback((feature: any) => {
        const colors = [
            '#fffbca',
            '#ffef88',
            '#ffe988',
            '#ffd752',
            '#ffce52',
            '#ffc041',
            '#fcb12f',
            '#ffa425',
            '#ff9925',
            '#FF7B00',
        ]

        const nivel = (+state.get(`${feature.properties.codarea} - ${form.ano}`)?.cob_vac_bcg / 10) - 0.0001;
        const color = parseInt(`${nivel}`)

        const pathOptions = { fill: true, color: colors[color], fillOpacity: .8, fillColor: colors[color] };
        const positions = [feature.geometry.coordinates[0].map((arr: any) => ([arr[1], arr[0]]))]

        const getInfo = () => {

            console.log('Open: ', state.get(`${feature.properties.codarea} - ${form.ano}`))

        }

        return (<>
            <Polyline
                pathOptions={pathOptions}
                positions={positions}>
                <Popup onOpen={getInfo} >{color * 10}%</Popup>
            </Polyline>
        </>)

    }, [form.ano, state])

    

    const changeSelect = ({ target }: any) => {
        setForm(old => ({ ...old, [target.id]: +target.value})) 
    }

    return (
        <Container>
            <h1>Vaga Junior - Cobertura da Vacinação BCG (2010/2019)</h1>
            <Pesquisa>
                <select defaultValue={form.estado} id="estado" onChange={changeSelect}>
                    {estados.map(({ id, nome, sigla }: any) => <option key={id} {...{ id, value: id }}>{nome}</option>)}
                </select>
                <select defaultValue={form.ano} id="ano" onChange={changeSelect}>
                    {anos.map((ano: any) => <option key={ano} {...{ id: ano, value: ano }}>{ano}</option>)}
                </select>
            </Pesquisa>
            <MapContainer center={[-23.60088996183807, -46.75979752536637]} zoom={5} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    state.size && features.map(Poly)
                }
            </MapContainer>
        </Container>
    )
}

export default Mapa;