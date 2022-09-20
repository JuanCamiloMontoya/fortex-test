import { useAuthSelectors } from "../services/Auth/AuthSelectors"
import Private from "./Private/Private"
import Public from "./Public/Public"

const App = () => {

  const { isAuthenticated } = useAuthSelectors()

  return isAuthenticated ? <Private /> : <Public />
}

export default App