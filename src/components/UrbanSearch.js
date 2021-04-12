import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import { setAllConts, setUrban, clearUrban, getAllUrbans, getUrbansForCont } from '../actions/cityActions'

const UrbanSearch = ({ allConts, allUrbans, setAllConts, getUrbansForCont, setUrban, clearUrban, getAllUrbans }) => {

    useEffect(()=>{
        setAllConts()
        getAllUrbans()
    }, [])

    const renderContsOption = () => {
        return allConts.map(cont => <option value={`${cont.name}`}>{cont.name}</option>)
    }
    
    const renderUrbanOption = () => {
        console.log('Hello')
        console.log(allUrbans)
        return allUrbans.map( urban => <option value={urban.name}>{urban.name}</option>)
    }

    const handleCont = e => {
        const selectedCont = allConts.find(cont => cont.name === e.target.value)
        selectedCont ? getUrbansForCont(selectedCont.href) : getAllUrbans()
    }

    const handleUrban = async e => {
        const foundCity = allUrbans.find( urban => urban.name === e.target.value)
        foundCity ? setUrban(foundCity.href) : clearUrban()
    }

    return (
        <div className='container' >
            <Form>
                <Form.Label>Urban City</Form.Label>
                <Form.Control as='input' list='urban-list' onChange={handleUrban} placeholder='Destination'/>
                <datalist id='urban-list'>
                    {allUrbans && renderUrbanOption()}
                </datalist>
                <Form.Label>Filter by Continent</Form.Label>
                <Form.Control as='select' onChange={handleCont}>
                    <option value='none' style={{color:'grey'}}>Select...</option>
                    {allConts && renderContsOption()}
                </Form.Control>
            </Form>
        </div>
    )
}

const mapStateToProps = state =>{
    return { 
        allConts: state.geo.allConts,
        allUrbans: state.geo.urbans
    }
}

export default connect(mapStateToProps, { setAllConts , setUrban, clearUrban , getAllUrbans, getUrbansForCont })(UrbanSearch);