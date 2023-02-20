import { Document, Model, model, Schema } from 'mongoose'

export interface IStore extends Document {
    name: string
    address: string
    state: string
    city: string
}
const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export const StoreModel: Model<IStore> = model<IStore>('Stores', StoreSchema)
