import PasscodeContext from "./PasscodeContext"
import axios from "axios"
import { useState } from "react";


const PasscodeProvider = ({children}) => {

    return(
        <PasscodeContext.Provider value={{}} >
          {children}
        </PasscodeContext.Provider>
    )
}

export default PasscodeProvider;