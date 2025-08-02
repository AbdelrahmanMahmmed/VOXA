const { getUserById, UpdateUserInDb , deleteUserInDb, getAllUsersInDb, GetAllCharactersInDb, uploadUserProfileImage } = require('./user.service');

exports.getUser = async (req, res, next) => {
    const userId = req.user._id || req.params.id;
    console.log(req.user._id);

    const User = await getUserById(userId);
    try {
        res.json({
            UserId: User.User.UserId,
            Name: User.User.name,
            Email: User.User.email
        })
    } catch (err) {
        next(err)
    }
};

exports.UpdateUser = async (req, res, next) => {
    const userId = req.user._id || req.params.id;
    console.log(req.user);
    const updateData = req.body;
    try {
        const updatedUser = await UpdateUserInDb(req,userId, updateData);
        res.json({
            UserId: updatedUser.User.UserId,
            Name: updatedUser.User.name,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const userId = req.user._id || req.params.id;
    try {
        const result = await deleteUserInDb(userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const result = await getAllUsersInDb(page , limit);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.UpdateRoles = async (req, res, next) => {
    const userId = req.params.id;
    const role = req.body.role;
    try {
        const updatedUser = await UpdateUserInDb(req, userId, { role });
        res.json({
            UserId: updatedUser.User.UserId,
            Name: updatedUser.User.name,
            Role: updatedUser.User.role
        });
    } catch (err) {
        next(err);
    }
};

exports.GetAllCharacters = async (req, res, next) => {
    try{
        const userId = req.user._id;
        const result = await GetAllCharactersInDb(userId);
        res.json({
            result
        })
    }
    catch(error)
    {
        next(error);
    }
}

exports.uploadImageProfile = async (req, res) => {
    const response = await uploadUserProfileImage(req , req.file);
    res.status(200).json(response);
};