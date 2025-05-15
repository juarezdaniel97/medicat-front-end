import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api_appointments, { createAppointmentsApi, getAppointmentsApi, updateAppointmentsApi } from "../../services/appointments";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { usePatientContext } from "../../contexts/PatientContext";

const FormAppointments = ({id_medico, id_patient, appointmentId, isMedico}) => {

    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const {getAppointment, setAgenda} = usePatientContext();

    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //Cargar los datos del turno si estamos editando
    useEffect(() => {
        const token = localStorage.getItem('token');
        api_appointments.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (appointmentId) {
            const fetchAppointment = async () =>{
                try {
                    const response = await getAppointmentsApi(appointmentId);
                    
                    reset({
                        medicoId: response?.data?.medicoId,
                        patientId: response?.data?.patientId,
                        appointmentDate: response?.data?.appointmentDate?.split('T')[0],
                        reason: response?.data?.reason,
                        status: response?.data?.status
                    })
                } catch (err) {
                    setError(err.response?.data?.message || err.message || "Error al cargar el turno");
                }
            }
            fetchAppointment()
        }

    }, [appointmentId, reset])
    

    const onSubmit = async (data) => {
        setLoading(true)
        setError(null)

        const dataAppointment = {
            medicoId: id_medico,
            patientId: id_patient || data.patientId ,
            appointmentDate: data.appointmentDate,
            reason: data.reason,
            status: data.status || 'programado'
        }

        try {
            
            if (appointmentId) {
                //Actualizar existente
                await updateAppointmentsApi(appointmentId, dataAppointment);
            }else{
                //Crear un nuevo turno
                await createAppointmentsApi(dataAppointment);
            }

            if (id_patient) {
                const updateAgenda = await getAppointment(id_patient);
                setAgenda(updateAgenda)
                // navigate('/patient/agenda')
            }
            navigate(-1)

            
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Error al guardar un turno");
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
                    {typeof error === 'string' ? error : "Ocurrió un error inesperado"}
                </div>
            )}

            <div className="mb-4">
                <label 
                    htmlFor="reason" 
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Motivo
                </label>
                <input 
                    id="reason"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900 dark:bg-gray-600 dark:text-white" 
                    placeholder="Motivo de consulta"
                    {...register("reason", {required: "Debe escribir un motivo general"})}
                />
                {errors.reason && (
                    <p className="mt-1 text-red-500 text-xs">{errors.reason.message}</p>
                )}
            </div>

            <div className="mb-6">
                <label
                    htmlFor="appointmentDate"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                >
                    Fecha del turno
                </label>
                <input 
                    id="appointmentDate" 
                    type="date"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                    {...register("appointmentDate", {required: "La fecha es obligatoria"})}
                />
                {errors.appointmentDate && (
                    <p className="mt-1 text-red-500 text-xs">{errors.appointmentDate.message}</p>
                )}
            </div>


            {
                isMedico && appointmentId && (
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                            Estado del turno
                        </label>
                        <select
                            id="status"
                            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                            {...register("status")}
                        >
                            <option value="programado">Programado</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>

                        <input type="hidden" {...register("medicoId")}  />
                        <input type="hidden" {...register("patientId")} />
                    </div>
                    
                )
            }

            
            <button 
                onClick={() =>{ navigate(-1) } }
                className="mb-4 w-full bg-neutral-600 hover:bg-neutral-700 text-white  dark:bg-neutral-600 dark:hover:bg-neutral-700 py-2 px-4 cursor-pointer rounded-md">
                Volver
            </button>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2" />
                        {appointmentId ? 'Actualizando...' : 'Registrando...'}
                    </span>
                ) : (
                    appointmentId ? 'Actualizar turno' : 'Registrar turno'
                )}
            </button>
        </form>
    )
}

export default FormAppointments