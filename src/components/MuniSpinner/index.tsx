import { CircularProgress } from "@mui/material"
import { ASSETS_URL } from "../../config"

type RFC = React.FC<{
    size?: string | number
    circularProgressSize?: string | number
    textoSpinner?: string
    file?: "bola.png" | "bola-blanco.png"
}>

const MuniSpinner: RFC = ({
    size = 70,
    circularProgressSize = 100,
    textoSpinner = "",
    file = "bola.png",
}) => {
    return (
        <div className='d-flex align-items-center justify-content-center gap-4'>
            {textoSpinner !== "" && <h2>{textoSpinner}</h2>}
            <div className='d-flex justify-content-center align-items-center'>
                <CircularProgress
                    size={circularProgressSize}
                    className='color-primary'
                />
                <img
                    src={ASSETS_URL + file}
                    alt='Municipalidad Spinner'
                    style={{ width: size, height: size, position: "absolute" }}
                />
            </div>
        </div>
    )
}

export default MuniSpinner
