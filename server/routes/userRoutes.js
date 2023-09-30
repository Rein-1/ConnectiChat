const router = require('express').Router();
const User = require('../models/User');

// CREATING USER
router.post('/', async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        console.log(req.body);
        const user = await User.create({ name, email, password, picture });
        res.status(201).json(user);
    } catch (e) {
        let msg;
        if (e.code == 11000) {
            msg = "Invalid user";
        } else {
            msg = e.message;
        }
        console.error(e);
        res.status(400).json(msg);
    }
});

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        user.status = 'online';
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

module.exports = router; 

