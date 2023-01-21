import DatebuyDAO from "../dao/datebuyDAO.js"

export default class DatebuyController {
    static async apiGetBuyer(req, res, next) {
        console.log("hi")
        const {buyerList} = await DatebuyDAO.getBuyer();

        let response = {
            buyer: buyerList
        }
    

        res.json(response)
    }
    static async apiPutBuyer(req, res, next) {
        try {
            console.log(req.body.time);
            const color = req.body.color;
            const address = req.body.address;
            const time = req.body.time;
            const response = await DatebuyDAO.putBuyer(color, address, time);
            console.log("put successful")
            var {error} = response;
            if (error) {
                res.status(400).json({error})
            }
        }
        catch (e) {
            res.status(500).json({error})
        }
        

    }
}