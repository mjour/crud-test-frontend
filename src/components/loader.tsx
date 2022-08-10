import React from 'react'
import { Spinner } from 'reactstrap'

function Loader({ height = '80vh' }: { height?: string }) {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ height }}>
      <Spinner color='success' />
    </div>
  )
}

export default Loader;