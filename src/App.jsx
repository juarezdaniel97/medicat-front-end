import { Toaster } from "react-hot-toast"
import AppsRoutes from "./routers/AppsRoutes"


function App() {


  return (
    <>
      <Toaster position="bottom-right"/>
      <AppsRoutes />
    </>
  )
}

export default App
