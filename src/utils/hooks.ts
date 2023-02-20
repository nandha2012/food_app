import { ObjectId } from 'mongodb'

export function isEmpty(obj: any): boolean {
    if (
        obj === null ||
        obj === undefined ||
        (obj.length !== undefined && obj.length === 0) ||
        Object.keys(obj).length === 0
    ) {
        return true
    }
    return false
}

export const useObjectID = (id: string) => {
    if (!isEmpty(id)) {
        if (ObjectId.isValid(id)) {
            console.log('valid object ID')
            return new ObjectId(id)
        } else {
            console.log('Invalid object ID')
            return ''
        }
    } else return ''
}
