import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { TEST_endPointUrl } from './common/api/endPointUrl';
import { createContext } from "react"


const Tokens = createContext();
function App() {
  const [token, setToken] = useState()
  const [issubs, setSubs] = useState()

  // for client requirement
  const Handlechange = useCallback(() => {
    let userdata = JSON.parse(localStorage.getItem("userdata"))
    let subst = userdata?.subscriptions
    setSubs(subst?.length ? true : false)
  }, [setSubs])


  useEffect(() => {
    const Token = () => {
      const data = new FormData();
      data.append('username', 'ImagnusAPIs');
      data.append('password', '5EFGJd6m');

      const config = {
        method: 'post',
        url: TEST_endPointUrl + 'api/student/v2/auth/token/',
        data: data
      };

      axios(config)
        .then((response) => {
          if (response.data.access_token) {
            setToken(response.data.access_token)
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    }
    Token()
  }, [token])

  useEffect(() => {
    Handlechange()
  }, [Handlechange])

  return (
    <>
      <Tokens.Provider value={token}>
        <AppRoutes issubs={issubs} Handlechange={Handlechange} />
      </Tokens.Provider>
    </>
  );
}

export default App;
export { Tokens };

