import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';


export default function Brands() {

  const GetAllProducts = async () => {

    let {data} = await axios.get(`${baseUrl}/Brands`)
    console.log(data.data);
  }
  return (
<Container >
      <Row>
        <Col >brands</Col>
      </Row>
    </Container>
  )
}
