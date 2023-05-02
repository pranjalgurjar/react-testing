import React from 'react';
// import "./loader.scss"

function Loader() {
  return (<>
    <h4 className='text-center mt-2'>Please Wait...</h4>
    <div class="text-center text-primary">
      <div class="spinner-border" role="status" style={{ marginTop: "20%" }}>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </>);
}

export default Loader;