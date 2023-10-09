import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import { createContext } from "react"
import { isLogin } from './utils/index';
import { useCallback } from 'react';
import axiosClient from "./webServices/webservice"
import { webUrls } from './webServices/webUrls';


const Tokens = createContext();
function App() {


  const [token, setToken] = useState(null)
  const [couresPageData, setCouresPageData] = useState([])



  useEffect(() => {
    const Token = async () => {
      const data = new FormData();
      data.append('username', 'ImagnusAPIs');
      data.append('password', '5EFGJd6m');
      try {
        let response = await axiosClient.post(webUrls.TOKEN_URL, data)
        if (response.status === 200) {
          setToken(response.data.access_token)
        }
      } catch (e) {
        // console.log(e)
      }
    }
    Token()
  }, [token])

  var Alldata = useCallback(async () => {
    let isLog = isLogin()
    if (isLog && token) {
      const headers = {
        'Authorization': 'Bearer ' + token,
      }
      try {
        let response = await axiosClient.get(webUrls.ALL_PREFRENCE_URL, { headers: headers })
        if (response.status === 200) {
          setCouresPageData(response.data)
        }
      } catch (e) {
        // console.log(e);
      }
    };
  }, [token])

  useEffect(() => {
    Alldata()
  }, [Alldata, token])

  return (
    <>
      <Tokens.Provider value={token}>
        <AppRoutes couresPageData={couresPageData} Alldata={Alldata} />
      </Tokens.Provider>
    </>
  );
}

export default App;
export { Tokens };

