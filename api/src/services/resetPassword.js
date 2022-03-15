const { search, hash } = require("./login");
const { Update } = require("./updateUser");



function key (){
    let result = Math.random().toString(36).substring(0,8);  
    const keys = result.split(".").join("").toUpperCase();
    return keys
}
async function validate (body){
    let hasheador = await hash(body.password)
    const user = await search({ email: body.email.toLowerCase() })
    if (user) {
        if (body.email && body.token && hasheador) {
            if (user.email === body.email.toLowerCase() && user.token === body.token) {
                let update = await Update({ email: body.email.toLowerCase(), hasheador: hasheador })
                return update
            }
            return "Revise que sus campos sean correctos "
        }
        if (body.email && !body.token && hasheador) {
            const user = await search({ email: body.email.toLowerCase() })
            if (user) {
                let update = await Update({ email: body.email.toLowerCase(), hasheador: hasheador })
                return update
            }
        }
        return "Error falta algun campo"
    }
    return "Usuario no encontrado" 
}
module.exports ={
    key, 
    validate
}