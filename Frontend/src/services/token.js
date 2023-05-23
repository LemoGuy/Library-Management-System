import { useStorage } from "../../Hooks/useStorage"

const [token, setToken] = useStorage('token', 'local')

export {token, setToken}