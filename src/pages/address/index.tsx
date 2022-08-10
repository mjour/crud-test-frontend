import React from 'react'
import { Button } from 'reactstrap'
import './index.css'

function Address() {
  return (
    <div>
      <h2 className='text-center mb-5'> My Address</h2>
      <div className="row">
        {
          Array(10)
            .fill(0).map((item, idx) =>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h2>{idx + 1}</h2>
                    <div className="row">
                      <div className="pe-2 col-md-6 d-flex mb-3 justify-content-between">
                        <h6>Country:</h6>
                        <h6 className='ps-2'>Nigeria</h6>
                      </div>
                      <div className="col-md-6 d-flex mb-3 justify-content-between">
                        <h6>State:</h6>
                        <h6 className='ps-2'>Lagos</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-md-6 d-flex mb-3 justify-content-between">
                        <h6>Lga:</h6>
                        <h6 className='ps-2'>Ikorodu</h6>
                      </div>
                      <div className="col-md-6 d-flex mb-3 justify-content-between">
                        <h6>Location:</h6>
                        <h6 className='ps-2'>No 5, Jubilee Estate Ikorodu Lagos Nigeria</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Button color='danger' block>Delete</Button>
                      </div>
                      <div className="col-md-6">
                        <Button color='success' block>Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
        }
      </div>
    </div>
  )
}

export default Address