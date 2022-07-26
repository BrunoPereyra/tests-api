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
    if (theme === undefined) {
        theme = []
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



    } else if (theme[0] == undefined && following !== true) {
        const story = await Storys.find({}).sort({ date: -1 }).limit(limit);
        return ress.status(202).json({
            ress: story,
        });



    } else if (theme[0] !== undefined && following !== true) {
        for (let i = 0; i < theme.length; i++) {
            const e = theme[i];
            if (e !== "terror" && e !== "misterio" && e !== "fantasmas") {
                const story = await Storys.find({}).sort({ date: -1 }).limit(limit);

                return ress.status(202).json({
                    ress: story,
                });
            }
        }

        let iTheme = theme.length
        if (iTheme == 1) {
            let story = await Storys.find({
                $or: [
                    { theme: theme[0] }
                ]
            }).sort({ date: -1 }).limit(limit);

            return ress.status(202).json({
                ress: story,
            });

        } else if (iTheme == 2) {
            let story = await Storys.find({
                $or: [
                    { theme: theme[0] },
                    { theme: theme[1] }
                ]

            }).sort({ date: -1 }).limit(limit);

            return ress.status(202).json({
                ress: story,
            });

        } else if (iTheme == 3) {
            let story = await Storys.find({
                $or: [
                    { theme: theme[0] },
                    { theme: theme[1] },
                    { theme: theme[2] },
                ]
            }).sort({ date: -1 }).limit(limit);

            return ress.status(202).json({
                ress: story,
            });
        } else {
            const story = await Storys.find({}).sort({ date: -1 }).limit(limit);

            return ress.status(202).json({
                ress: story,
            });

        }



    } else if (following === true && theme[0] == undefined) {
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
                    .populate("storys", {}, null, { sort: { date: -1 } })
                followingUser.push(userf)
            }

            return ress.status(202).json({
                ress: followingUser,
            });
        }



    } else if (following === true && theme[0] !== undefined) {
        const user = await users.findById(idUser);
        const followingU = await user.following;

        for (let i = 0; i < theme.length; i++) {
            const e = theme[i];
            if (e !== "terror" && e !== "misterio" && e !== "fantasmas") {
                followingUser = []
                for (let i = 0; i < followingU.length; i++) {
                    let idUserF = followingU[i]
                    let userf = await users.findById(idUserF)
                        .populate({
                            path: "storys",
                            select: {},
                            match: {},
                            options: { limit: 20, sort: { date: -1 } },
                        })
                    followingUser.push(userf)
                }
                return ress.status(202).json({
                    ress: followingUser,
                });
            }
        }

        if (followingU[0] == undefined) {
            let iTheme = theme.length
            if (iTheme == 1) {
                let story = await Storys.find({
                    $or: [
                        { theme: theme[0] },
                    ]
                }).sort({ date: -1 }).limit(limit);

                return ress.status(202).json({
                    ress: story,
                });
            } else if (iTheme == 2) {
                
                let story = await Storys.find({
                    $or: [
                        { theme: theme[0] },
                        { theme: theme[1] },
                    ]
                }).sort({ date: -1 }).limit(limit);
                return ress.status(202).json({
                    ress: story,
                });

            } else if (iTheme == 3) {
                let story = await Storys.find({
                    $or: [
                        { theme: theme[0] },
                        { theme: theme[1] },
                        { theme: theme[2] },
                    ]

                }).sort({ date: -1 }).limit(limit);
                return ress.status(202).json({
                    ress: story,
                });
            }

        } else if (followingU) {
            followingUser = []
            let iTheme = theme.length
            for (let i = 0; i < followingU.length; i++) {

                let idUserF = followingU[i]

                if (iTheme == 1) {
                    let userf = await users.findById(idUserF)
                        .populate({
                            path: "storys",
                            select: {},
                            match: {
                                $or: [
                                    { theme: theme[0] }
                                ]
                            },
                            options: { limit: 20, sort: { date: -1 } },
                        })

                    followingUser.push(userf)
                } else if (iTheme == 2) {
                    let userf = await users.findById(idUserF)
                        .populate({
                            path: "storys",
                            select: {},
                            match: {
                                $or: [
                                    { theme: theme[0] },
                                    { theme: theme[1] },
                                ]
                            },
                            options: { limit: 20, sort: { date: -1 } },
                        })

                    followingUser.push(userf)
                } else if (iTheme == 3) {
                    let userf = await users.findById(idUserF)
                        .populate({
                            path: "storys",
                            select: {},
                            match: {
                                $or: [
                                    { theme: theme[0] },
                                    { theme: theme[1] },
                                    { theme: theme[2] },
                                ]
                            },
                            options: { limit: 20, sort: { date: -1 } },
                        })

                    followingUser.push(userf)
                }
            }

            return ress.status(202).json({
                ress: followingUser,
            });
        }
    }
    else {
        return ress.status(400).json({
            ress: "error",
        });
    }
};
module.exports = getStories;
