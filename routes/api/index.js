const router = require('express').Router();

// requiring route files
const thoughtRoutes = require('./thoughtroutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;