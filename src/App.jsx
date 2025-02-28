import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"

import PersonnesList from "./personnes/PersonnesList"
import ProjetsList from "./projets/ProjetsList"
import ShowPersonne from "./personnes/ShowPersonne"
import ShowProjet from "./projets/ShowProjet"
import { ConfigProvider } from "antd"
import { useFetchData } from "./service/FetchData"

function App() {
  const loading = useFetchData()

  if (loading) {
    return <h2 className="text-center mt-4">Loading...</h2>
  }

  return (
    <>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff865b",
              colorInfo: "#ff865b",
              colorBgBase: "#1b262c",
              colorTextBase: "#9fb9d0",
              colorTextQuaternary: "#9fb9d0a6",
            },
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<h1>home</h1>} />

              <Route path="/personnes">
                <Route index element={<PersonnesList />} />
                <Route path=":id" element={<ShowPersonne />} />
              </Route>
              <Route path="/projets">
                <Route index element={<ProjetsList />} />
                <Route path=":id" element={<ShowProjet />} />
              </Route>

            <Route path="*" element={<h1>Page Not Found Error 404</h1>} />
          </Routes>
        </ConfigProvider>
      </BrowserRouter>
    </>
  )
}

export default App

