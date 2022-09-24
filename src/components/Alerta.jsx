
const Alerta = ({alerta}) => {

    return (
        <div className={`${ alerta.error ? ' bg-red-300 text-red-900' : ' bg-green-300 text-green-900'} text-center mx-8 py-2 px-4 uppercase rounded-xl font-medium mb-4`}>{alerta.msg}</div>
    )
}

export default Alerta