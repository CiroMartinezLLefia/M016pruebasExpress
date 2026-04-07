import Usuario from '../modelos/Usuario.js';

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find().select('-password').sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    res.status(500).json({ error: 'Error fetching usuarios' });
  }
}

export async function cambiarRolUsuario(req, res) {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!['usuari', 'editor', 'admin'].includes(rol)) {
      return res.status(400).json({ error: 'Rol invalid' });
    }

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { rol },
      { new: true, runValidators: true }
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ error: 'Usuari no trobat' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error updating rol:', error);
    res.status(500).json({ error: 'Error updating rol' });
  }
}
