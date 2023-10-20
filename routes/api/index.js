const router = require('express').Router();
const reactionRoutes = require('./reactionroutes');
const thoughtRoutes = require('./thoughtroutes');
const userRoutes = require('./userRoutes');

router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;