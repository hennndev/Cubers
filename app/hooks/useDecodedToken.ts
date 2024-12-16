import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

type DecodedTypes = {
    email: string
    iat: number
    exp: number
}

const useDecodedToken = (token: string) => {
    const [dataDecoded, setDataDecoded] = useState<DecodedTypes | null>(null)

    useEffect(() => {
        if(token) {
            const dataDecode: DecodedTypes = jwtDecode(token)
            setDataDecoded(dataDecode)
        }
    }, [token])

    return {
        dataDecoded
    }
}

export default useDecodedToken