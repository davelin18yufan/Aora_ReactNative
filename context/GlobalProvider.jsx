import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser } from "../lib/appwrite"

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setIsLoading,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
