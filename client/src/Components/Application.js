import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
// import { Box } from '@material-ui/core';
import axios from 'axios';
// import {Button} from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';



export default function Application() {


    const [APIData, setAPIData] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/ApplicantList`)
            .then(response => {
                setAPIData(response.data)
            })
    }, [])



    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 50,

        firstPageText: '<<',
        lastPageText: '>>',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);

        }

    })


    console.log(APIData)

    function grantButton(cell, row, rowIndex, formatExtraData) {
        return <div>
            <button type="button" class="btn btn-outline-success btn-sm">Grant</button>
        </div>
    }
    function referButton(cell, row, rowIndex, formatExtraData) {
        return <div>
            <button type="button" class="btn btn-outline-primary btn-sm">Refer</button>
        </div>
    }

    function viewButton(cell, row, rowIndex, formatExtraData) {
        return <div>
            <button type="button" class="btn btn-outline-info btn-sm">View</button>
        </div>
    }
    // filter: textFilter() 
    // const { SearchBar } = Search
    const columns = [
        { dataField: '_id', text: 'ID', sort: true ,filter: textFilter()  },
        { dataField: 'Name', text: 'Name', sort: true,filter: textFilter() },
        { dataField: 'Mobile_Number', text: 'Mobilenumber', sort: true,filter: textFilter() },
        { dataField: 'Aadhar_Number', text: 'Aadhaar Number', sort: true,filter: textFilter() },
        { dataField: 'Status', text: 'Status' },
        {
            dataField: 'Grant', text: 'Grant', isDummyField: true,
            formatter: grantButton
        },
        {
            dataField: 'Refer', text: 'Refer',
            isDummyField: true,
            formatter: referButton
        },
        {
            dataField: 'View',
            text: 'View',
            isDummyField: true,
            formatter: viewButton

        },

    ]

    return (
        <main id="site-main">
            <div>
            <div className='container'>

                <div className='row'>
{/* <>
                    <ToolkitProvider
                        keyField="_id"
                        data={APIData}
                        columns={columns}
                        search
                    >
                        {
                            toolkitprops => (
                                <div>
                                    <h3>Input something at below input field:</h3>
                                    <SearchBar {...toolkitprops.searchProps} />
                                    <hr />
                                    <BootstrapTable
                                       
                                        {...toolkitprops.baseProps}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider></> */}

                    <div>
                        <h6>Applicant Details</h6>
                    </div>



                    <BootstrapTable
                        bootstrap4
                        striped
                        hover
                        condensed
                        keyField='_id'
                        columns={columns}
                        data={APIData}
                        pagination={pagination}
                        filter={filterFactory()}
                    />

                </div>

            </div>



            {/* <Card style={{ width: '100ch' }} className='mx-auto'>
                <span>
                </span><br></br>
                <h3><i>Applicant Details:</i></h3><br></br>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >





                </Box>
            </Card> */}



            {/* {APIData.map((data) => 

                <BootstrapTable keyField='id' columns={columns}></BootstrapTable>


            )} */}






        </div>
        </main>
        
    )
}
