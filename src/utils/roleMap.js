
export const roleMap = {
    admin: {
        id: '681e007ba1731381e9991ca0',
        name: 'Admin',
        description: 'Administrador del sistema',
        permissions: ['read', 'write', 'delete'],
    },
    doctor: {
        id: '681e007ba1731381e9991ca2',
        name: 'Medico',
        description: 'Médico',
        permissions: ['read', 'write'],
    },
    patient: {
        id:'681e007ba1731381e9991ca4',
        name: 'Paciente',
        description: 'Paciente del sistema',
        permissions: ['read'],
    },
};