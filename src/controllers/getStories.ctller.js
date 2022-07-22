const Storys = require("../models/Story");
const users = require("../models/users");


const getStories = async (req, ress) => {

    let { limit, theme, following, idStory } = req.body;
    const { idUser } = req;

    if (limit == undefined) {
        limit = 20;
    }
    if (following !== true) {
        following = false
    }

    if (idStory) {
        if (idStory.length == 24 && typeof idStory == "string") {
            const story = await Storys.findById(idStory).populate("user", {
                _id: 0
            })
            return ress.status(202).json({
                ress: story,
            });
        } else {
            return ress.status(404).json({
                ress: "historia no encontrada o mal id",
            });
        }
    } else if (theme == undefined && following !== true) {
        const story = await Storys.find({}).sort({ date: -1 }).limit(limit);
        return ress.status(202).json({
            ress: story,
        });

    } else if (theme && following !== true) {
        if (theme == "misterio" || theme == "extraterrestre" || theme == "fantasmas") {
            const story = await Storys.find({ theme: theme })
                .sort({ date: -1 })
                .limit(limit);
            return ress.status(202).json({
                ress: story,
            });
        } else {
            const story = await Storys.find({}).sort({ date: -1 }).limit(limit);
            return ress.status(202).json({
                ress: story,
            });

        }

    } else if (following === true && theme == undefined) {

        const user = await users.findById(idUser);
        const followingU = await user.following;
        if (followingU[0] == undefined) {
            const story = await Storys.find({}).sort({ date: -1 }).limit(limit);
            return ress.status(202).json({
                ress: story,
                msj: "no sigue a nadie",
            });

        } else if (followingU) {
            followingUser = []
            for (let i = 0; i < followingU.length; i++) {
                let idUserF = followingU[i]
                let userf = await users.findById(idUserF)
                    .populate("storys", {
                        _id: 0
                    })

                followingUser.push(userf)
            }
            console.log(followingUser, "aa");

            return ress.status(202).json({
                ress: followingUser,
            });
        }

    } else {
        return ress.status(400).json({
            ress: "error",
        });
    }
};
module.exports = getStories;
