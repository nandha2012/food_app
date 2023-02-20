import mongoose, { Document, Model, model, ObjectId, Schema } from 'mongoose'

export interface IOfferProcducts {
    product: string | ObjectId
    offerPrice: Number
}

export interface IOffer extends Document {
    store: string | ObjectId
    products: IOfferProcducts[]
    type: 'dayOfWeek' | 'dateRange'
    daysOfWeek?: string[]
    startDate?: Date
    endDate?: Date
}

const ProductOfferSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    offerPrice: { type: Number, required: true },
})

const offerSchema: Schema<IOffer> = new Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stores',
        required: true,
    },
    products: [{ type: ProductOfferSchema, required: true }],
    type: { type: String, enum: ['dayOfWeek', 'dateRange'], required: true },
    daysOfWeek: [
        {
            type: String,
            enum: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
        },
    ],
    startDate: {
        type: Date,
        required: function (this: IOffer) {
            return this.type === 'dateRange'
        },
    },
    endDate: {
        type: Date,
        required: function (this: IOffer) {
            return this.type === 'dateRange'
        },
    },
})

offerSchema.pre<IOffer>('save', function (next) {
    if (this.type === 'dayOfWeek') {
        this.startDate = undefined
        this.endDate = undefined
    } else if (this.type === 'dateRange') {
        this.daysOfWeek = []
    }
    next()
})

export const OfferModel: Model<IOffer> = model<IOffer>('Offer', offerSchema)
