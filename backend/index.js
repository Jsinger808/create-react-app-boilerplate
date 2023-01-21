import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import DatebuyDAO from "./dao/datebuyDAO.js"

dotenv.config({ path: '../.env' })
const MongoClient = mongodb.MongoClient
const port = process.env.REACT_APP_PORT || 8000

MongoClient.connect(
    process.env.REACT_APP_MONGO_URI,
    {
        maxPoolSize:10,
        wtimeoutMS:250,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1)
})
.then(async client => {
    await DatebuyDAO.injectDB(client)
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    })
})