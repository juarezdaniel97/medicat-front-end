import { usePatientContext } from "../../contexts/PatientContext"


const ListPatient = () => {

    const { pacientes, loading } = usePatientContext();

    return (
        <div>
            <h1>Listado de Pacientes</h1>
            {
                loading ? ( <p>Cargando ... </p> ) : 
                (
                    <div>
                        { pacientes && pacientes.map((paciente) => (
                            <div key={paciente._id}>
                                <h2>{paciente.firstName} { paciente.lastName } </h2>
                            </div>
                        ))
                        }
                    </div>
                )

                //Falta añadir un <p> cuando no hay pacientes
            }
        </div>
    )
}

export default ListPatient