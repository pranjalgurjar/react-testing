import React from 'react';
import "./loader.scss"

function Loader(props) {
  return (<>
    <div className='spinLoader'>
      <div className='spinner-border text-primary circle' role='status'>
        <span className='sr-only' ></span>
      </div>
    </div>
      <h4 className='text-center'>Please Wait...</h4>
  </>);
}

export default Loader;