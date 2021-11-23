import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

import { useState } from 'react'

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

const Map = (props: any) => {
    const [features, setFeatures] = useState(props.data.regioes.data.features)

    function Poly (feature: any) {
        return <Polyline pathOptions={{ color: 'lime' }} positions={[feature.geometry.coordinates[0].map((arr: any) => ([arr[1], arr[0]]))]} />
    }
    

    return (
        <Container>
            <h1>Vaga Junior</h1>
            <Pesquisa>
                <select>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <select>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </Pesquisa>
            <MapContainer center={[-23.60088996183807, -46.75979752536637]} zoom={13} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    features.map(Poly)
                }
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}

export default Map