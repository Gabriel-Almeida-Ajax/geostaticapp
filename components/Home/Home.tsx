import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'



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
    console.log(props)

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
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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