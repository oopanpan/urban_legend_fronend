import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios'

import { setAllConts } from '../actions/cityActions'
import api from '../service/api'

const UrbanSearch = ({ allConts, setAllConts }) => {

    const [selectedUrban, setSelectedUrban] = useState(null)
    const [selectedContinent, setSelectedContinent] = useState(null)

    useEffect(() => {
        selectedContinent && axios.get(selectedContinent).then(r => setSelectedUrban(r.data['_links']['ua:items']))
    }, [selectedContinent])

    useEffect(() => {
        api.teleport.getAllConts().then(r => setAllConts(r['_links']['continent:items']))
    }, [setAllConts])

    const renderContsOption = () => {
        return allConts && allConts.map(cont => <option value={`${cont.name}`}>{cont.name}</option>)
    }

    const handleCont = async e => {
        // console.log(allConts.find(cont => cont.name ===e.target.value))
        await axios.get(allConts.find(cont => cont.name ===e.target.value).href)
        .then(r => setSelectedContinent(r.data['_links']['continent:urban_areas'].href))
    }

    const renderUrbanOption = () =>{
        return selectedUrban && selectedUrban.map( urban => <option value={urban.name}>{urban.name}</option>)
    }

    return (
        <div className='container'>
            <Form>
                <Form.Label>Continent</Form.Label>
                <Form.Control as='select' onChange={handleCont}>
                    <option value='none' style={{color:'grey'}}>Select...</option>
                    {renderContsOption()}
                </Form.Control>
                <Form.Label>Urban City</Form.Label>
                <Form.Control as='select' onChange={null}>
                    {renderUrbanOption()}
                </Form.Control>
            </Form>
        </div>
    )
}

const mapStateToProps = state =>{
    console.log(state)
    return { allConts: state.geo.allConts }
}

export default connect(mapStateToProps, { setAllConts })(UrbanSearch);