import mongoose from "mongoose"
import { MONGODB_URI } from "./config"

mongoose.connect(MONGODB_URI, {useNewURLParser:true, useUnifiedTopology:true})
    .then((data) => console.log('DB se encuentra conectada.'))
    .catch((error) => console.log(error))
