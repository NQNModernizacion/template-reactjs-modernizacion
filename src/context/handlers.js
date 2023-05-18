/** Verifica si existe el rol en la coleccion del usuario */
export const hasRole = (role, user) => {
    if (!role) return false
    if (!user) return false

    return user.roles?.some(r => r.name === role)
}

export const hasPermission = (permission, user) => {

    if (!permission) return false
    if (!user) return false

    if (user.permissions?.some(p => p.name === permission)) {
        return true;
    }

    /* Generamos un arreglo nuevo de permisos de esos roles */
    const permissionsRoles = user.roles?.reduce((prev, curr) => {
        prev.push(...curr.permissions)
        return prev
    }, [])

    return permissionsRoles?.some(p => p.name === permission)
}

export const hasDirectPermission = (permission, user) => {
    if (!permission) return false
    if (!user) return false

    return user.permissions?.some(p => p.name === permission)
}