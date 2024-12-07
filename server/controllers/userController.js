const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users); // Mengembalikan data user dalam bentuk JSON
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Mengembalikan data user berdasarkan ID
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Memperbarui user
    await user.update({ name, email, password });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Menghapus user
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
