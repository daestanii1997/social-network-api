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

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friend').post(addFriend);

router.route('/userId/friend/:friendId').delete(deleteFriend);

module.exports = router;