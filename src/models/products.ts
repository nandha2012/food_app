import { Document, Model, model, Schema } from 'mongoose'

export interface IProducts extends Document {
    name: string
    price: string
}
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

export const ProductModel: Model<IProducts> = model<IProducts>(
    'Products',
    ProductSchema
)
