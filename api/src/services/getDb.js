const { User, Post, Review } = require('../db');


async function infoTotalDb(){
    return await User.findAll({
        include:[{
            model: Post,
            as: 'posteos'
        },{
            model: Review,
            as: "reviews"
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