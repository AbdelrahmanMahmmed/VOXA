const { getUser, updateUser, getAllUsers } = require('../../domains/user/user.repo');

exports.getUserById = async (id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }
    return {
        User: {
            UserId: User.UserId,
            name: `${User.fName} ${User.lName}`,
            email: User.email
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

exports.GetAllCharactersInDb = async (id) => {
    const User = await getUser(id);
    if (!User || User.IsDeleted) {
        throw new Error('User not found Or Deleted');
    }
    return {
        data: User.Characters || [],
    }
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

    return { message: 'Image updated successfully', imageUrl };
};
