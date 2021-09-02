export const updateObjInArray = (items, itemId, objName, newObjProps) => {
    items.map(u => {
        if (u[objName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}