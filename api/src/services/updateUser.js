const { User } = require("../db")
const { search } = require("./login")

async function Update(body){
    let user = await search({email: body.email.toLowerCase()})
    console.log(body)
    if(user){
        const result = await User.update(
            {
             password: body.hasheador ? body.hasheador : user.password,
             token: body.token ? body.token : null,
             name: body.name ? body.name : user.name ? user.name: null,
             last_name: body.last_name ? body.last_name : user.last_name ? user.last_name : null,
             phone: body.phone ? body.phone : user.phone ? user.phone : null,
             location: body.location ? body.location : user.location ? user.location : null,
             rating: body.rating ? body.rating : user.rating ? user.rating : null,
             bookings: body.bookings ? body.bookings : user.bookings ? user.bookings : null,
            }, //what going to be updated
           { where: { email: body.email }} // where clause
         )
         return result
    } 
    return "Resultado no encontrado"
}

module.exports ={ 
    Update
}
