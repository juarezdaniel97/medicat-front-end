import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { createAppointmentsApi } from "../../services/appointments";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormAppointments = ({id_medico, id_patient}) => {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        setError(null)

        const dataAppointment = {
            medicoId: id_medico,
            patientId: id_patient,
            appointmentDate: data.appointmentDate,
            reason: data.reason,
            status: 'programado'
        }

        try {
            const response = await createAppointmentsApi(dataAppointment);
            if (response) {
                navigate(-1)
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Error al crear el turno");
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

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2" />
                        Registrando...
                    </span>
                ) : (
                    'Registrar'
                )}
            </button>
        </form>
    )
}

export default FormAppointments