

export const can = (role, permission) => {
    if (!role || !role.permissions) {
        return false
    }
    return role.permissions
}

export const canProfe = (user, persmission) => {
    if (!user || !user.permissions) {
        return false
    }

    return user.permissions.include(persmission)
}