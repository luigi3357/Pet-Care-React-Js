const { User, Post, Review } = require('../db');


async function infoTotalDb(){
    return await User.findAll({
        include:[{
            model: Post, 
            as:"posteos",
            attributes: ['id','title', 'description', 'price', 'type', 'size', 'address', 'phone']
        },{
            model: Review,
            as:"reviews",
            attributes: ['id', 'from_id', 'name', 'message', 'rate']         
        }]
    })
}

async function infoPostDb(){
    return await Post.findAll({
        include: {
            model: User,
            as: "author",
            include: {
                model: Review,
                as: "reviews",
                order: [['createdAt','DESC']],
                attributes: ['id','rate', 'message', 'from_id', 'updatedAt']

            },
            attributes: ['name', 'last_name', 'rating', 'bookings']
        },
        order: [['createdAt','DESC']],
        attributes: ['id','title', 'description', 'updatedAt']

    });
}

module.exports ={ infoTotalDb, infoPostDb }