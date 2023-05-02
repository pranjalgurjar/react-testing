import React from 'react';
// import "./loader.scss"

function Loader() {
  return (<>
    <h4 className='text-center mt-2'>Please Wait...</h4>
    <div className="text-center text-primary">
      <div className="spinner-border" role="status" style={{ marginTop: "20%" }}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </>);
}

export default Loader;