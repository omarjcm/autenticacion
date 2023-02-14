import mongoose from "mongoose"

mongoose.connect('mongodb+srv://gpizarro:inexcelsisdeo@cluster0.grgqiyq.mongodb.net/?retryWrites=true&w=majority', {useNewURLParser:true, useUnifiedTopology:true})
    .then((data) => console.log('DB se encuentra conectada.'))
    .catch((error) => console.log(error))
