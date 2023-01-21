import dotenv from "dotenv"
dotenv.config({ path: '../.env' })

let datebuy
export default class DatebuyDAO {
    static async injectDB(conn) {
        if (datebuy) {
            return
        }
        try {
            datebuy = await conn.db(process.env.REACT_APP_DATEBUY_NS).collection("Buyer")
            // console.log(datebuy)
        } catch (e) {
            console.error(`Unable to establish a connection to MongoDB: ${e}`)
        }
    }

    static async getBuyer() {
        let cursor
        try {
            cursor = await datebuy.find({}).sort({_id:-1}).limit(1)
            const buyerList = await cursor.toArray()
            return {buyerList};
        } catch (e) {
            console.error(`Unable to gather any data: ${e} `)
            return {buyerList: []};
        }
    }

    static async putBuyer(color, address, time) {
        let cursor
        try {
            const currentBuyer = {
                color: color,
                address: address,
                time: time
            }
            return await datebuy.insertOne(currentBuyer)
        } catch (e) {
            console.error(`Insert data failed: ${e} `)
            return{error:e}
        }
    }
}