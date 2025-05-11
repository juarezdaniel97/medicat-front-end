
export const roleMap = {
    admin: {
        id: '681e007ba1731381e9991ca0',
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read', 'write', 'delete'],
    },
    medico: {
        id: '681e007ba1731381e9991ca2',
        name: 'medico',
        description: 'Médico',
        permissions: ['read', 'write'],
    },
    paciente: {
        id:'681e007ba1731381e9991ca4',
        name: 'paciente',
        description: 'Paciente del sistema',
        permissions: ['read'],
    },
};