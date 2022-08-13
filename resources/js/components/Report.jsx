import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar, Table } from 'react-bootstrap';
import ReactDOM from 'react-dom';

function Example() {
    const [reports, setReports] = useState();
    const [show, setShow] = useState(false);
    const [purchases, setPurchases] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [total, setTotal] = useState();
    const [totalQuantity, setTotalQuantity] = useState();
    
    useEffect(() => {
        getReports();
    }, [])

    useEffect(() => {
        getReport();
    }, [show])

    const getReports = () => {
        const url = "https://raw.githubusercontent.com/Bit-Code-Technologies/mockapi/main/purchase.json";
        fetch(url).then(response=>{
            return response.json();
        }).then(responseData=>{
            setReports(responseData);
        });
    }

    const getReport = async() => {
        const url = "api/reports";
        const res = await axios.get(url);
        setPurchases(res.data);
        let total_quantity = 0;
        let total_price = 0;
        if(res.data){
          res.data.map((report,index)=>{
            total_quantity = total_quantity + parseInt(report.quantity);
            total_price = total_price + parseInt(report.product_price);
        })
        }
        setTotalQuantity(total_quantity);
        setTotalPrice(total_price)
        setTotal(total_quantity*total_price);
    }

    const saveReport = async() =>{
        const data = reports;
        const res = await axios.post('/api/reports', data).then(response=>{
            setShow(true);
            return response;
        }).catch(error=>{
            return error.response;
        });
    }
    return (
        <>
        <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Report</Navbar.Brand>
        </Container>
      </Navbar>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                    {show===false ? 
                    <div className="card-body d-flex justify-content-center">
                        <Button variant="primary" onClick={saveReport}>Generate Report</Button>
                    </div>:
                    <div>
                                <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Customer Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>

        {purchases?.map((purchase,index)=>( 
        <tr key={index}>
            <td>{purchase.product_name}</td>
            <td>{purchase.name}</td>
            <td>{purchase.quantity}</td>
            <td>{purchase.product_price}</td>
            <td>{purchase.total_price}</td>
        </tr>
        ))}

        <tr>
          <td colSpan="2">Gross Total:</td>
          <td>{totalQuantity}</td>
          <td>{totalPrice}</td>
          <td>{total}</td>
        </tr>

      </tbody>
    </Table>
                    </div>
                    }

                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Example;

if (document.getElementById('report')) {
    ReactDOM.render(<Example />, document.getElementById('report'));
}
