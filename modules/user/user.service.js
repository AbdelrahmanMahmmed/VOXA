const { GetCharacterById } = require('../../domains/Character/character.repo');
const { getUser, updateUser, getAllUsers } = require('../../domains/user/user.repo');

exports.getUserById = async (id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }

    const charactersDetails = await Promise.all(
        User.Characters.map(async (charId) => {
            const char = await GetCharacterById(charId);
            return {
                name: char.name,
                specialty: char.Specialist
            };
        })
    );

    return {
        User: {
            UserId: User.UserId,
            name: `${User.fName} ${User.lName}`,
            email: User.email,
            characters : charactersDetails,
            plan : User.plan,
            Active : User.isActive,
            avatar: User.avatar
        }
    };
};

exports.UpdateUserInDb = async (req, id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }

    const updateData = await updateUser(id, {
        role: req.body.role || User.role,
    });

    return {
        User: {
            UserId: updateData.UserId,
            name: `${updateData.fName} ${updateData.lName}`,
            role: updateData.role
        }
    };
};

exports.UpdateUserName = async (req, id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }

    const updateData = await updateUser(id, {
        fName: req.body.fName || User.fName,
        lName: req.body.lName || User.lName
    });

    return {
        User: {
            UserId: updateData.UserId,
            name: `${updateData.fName} ${updateData.lName}`,
            role: updateData.role
        }
    };
};

exports.deleteUserInDb = async (id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }
    await updateUser(id, {
        IsDeleted: true
    });
    return {
        message: 'User deleted successfully'
    };
};

exports.getAllUsersInDb = async (page, limit) => {
    const Users = await getAllUsers(page, limit);
    if (!Users || Users.users.length === 0) {
        throw new Error('No users found');
    }
    return {
        users: Users
    };
};

exports.GetAllCharactersInDb = async (id, isPublished) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error("User not found Or Deleted");
    }

    const populatedUser = await User.populate("Characters");

    let characters = populatedUser.Characters;

    if (typeof isPublished !== "undefined") {
        if (isPublished === "true" || isPublished === "false") {
            const boolValue = isPublished === "true";
            characters = characters.filter((char) => char.isPublished === boolValue);
        } else {
            throw new Error("Invalid value for isPublished, must be true or false");
        }
    }

    return {
        count: characters.length,
        data: characters.map((char) => ({
            name: char.name,
            avatar: char.avatar,
            specialist: char.Specialist,
            visibility: char.isPublished ? "public" : "private"
        }))
    };
};


const { uploadImage } = require('../../shared/utils/UploadImage');

exports.uploadUserProfileImage = async (req,file) => {
    const user = await getUser(req.user._id);
    if (!user) {
        throw new Error('User not found');
    }

    let imageUrl = '';
    if (file) {
        const result = await uploadImage(file);
        imageUrl = result.secure_url;
    }

    user.avatar = imageUrl;
    await user.save();

    return { message: 'Image updated successfully' };
};
