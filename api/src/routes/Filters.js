const { Router } = require('express');
const { infoPostDb, infoTotalDb } = require('../services/getDb');

const router = Router();



router.get('/orderandfilter/:order', async (req, res) => {
    let dataPost = await infoPostDb()
    let dataUser = await infoTotalDb()
    const {order} = req.params

//ordenamiento por rating    
    
    if(order ==="AllRating"){
      return res.send(dataUser)
    }
    if(order === "ascRating"){
     let ascendente = dataPost.sort((a, b)=>{
        if (a.rating > b.rating) return 1;
        if (a.rating < b.rating) return -1;
        return 0;
    })
    return res.send(ascendente)
    }
    if(order === "descRating"){
      let descendiente = dataPost.sort((a, b)=>{
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
    })
    return res.send(descendiente)
    }
    
//ordenamiento precio
    
    if(order ==="AllPrice"){
        return res.send(dataPost)
      }
      if(order === "ascPrice"){
       let ascendente = dataPost.sort((a, b)=>{
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
      })
      return res.send(ascendente)
      }
      if(order === "descPrice"){
        let descendiente = dataPost.sort((a, b)=>{
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
      })
      return res.send(descendiente)
      }

// filtrado por tamaño

    if(order==="AllTamaño"){
        res.send(dataPost)
    }
    if(order === "pequeño" || order === "mediano" || order === "grande"){
        let filtroSize = dataPost.filter(el=> el.size.toLowerCase() === order.toLowerCase())
    return res.send(filtroSize)
    }

//filtrado por tipo de mascota

    if(order==="AllType"){
        res.send(dataPost)
    }
    if(order === "perro" || order === "gato" || order === "aves" || order === "roedores"){
        let filtroTypes = dataPost.filter(el=> el.types.toLowerCase() === order.toLowerCase())
    return res.send(filtroTypes)
    }
})


module.exports = router;