const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
// These work!!
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// These work!!!
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friend
// This works!!
router.route('/:userId/friend').post(addFriend);

// /api/users/userId/friend/:friendId
// doesn't work :'(
router.route('/userId/friend/:friendId').delete(deleteFriend);

module.exports = router;