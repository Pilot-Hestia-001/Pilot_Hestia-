import VendorSelectContext from "./VendorSelectContext"
import { useState } from "react";

const VendorSelectProvider = ({children}) => {
   const [selectedVendorId, setSelectedVendorId] = useState(null);


    const handleVendorClick = (id) => {
        setSelectedVendorId(id);
    };

    return(
        <VendorSelectContext.Provider value={{selectedVendorId, setSelectedVendorId, handleVendorClick}} >
          {children}
        </VendorSelectContext.Provider>
    )
}

export default VendorSelectProvider;