import Vino from '../modelos/modeloVinos.js';

export async function getVinos(req, res) {
    try {
        const vinos = await Vino.find();
        res.json(vinos);
        return vinos;
    } catch (error) {
        console.error('Error fetching vinos:', error);
        res.status(500).json({ message: 'Error fetching vinos' });
    }
}

export async function getVinoById(req, res) {
    const id = req.params.id;
    try {
        const vino = await Vino.findById(id);
        if (vino) {
            res.json(vino);
        } else {
            res.status(404).json({ message: 'Vino not found' });
        }
    } catch (error) {
        console.error('Error fetching vino by ID:', error);
        res.status(500).json({ message: 'Error fetching vino' });
    }
}

export async function createVino(req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing' });
    }
    const { name, price } = req.body;
    try {
        const newVino = new Vino({ name, price });
        await newVino.save();
        res.json({ message: 'New vino created', vino: newVino });
    } catch (error) {
        console.error('Error creating vino:', error);
        res.status(500).json({ message: 'Error creating vino' });
    }
}

export async function updateVino(req, res) {
    const id = req.params.id;
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing' });
    }
    const { name, price } = req.body;
    try {
        const updatedVino = await Vino.findByIdAndUpdate(id, { name, price }, { new: true });
        if (updatedVino) {
            res.json({ message: 'Vino updated', vino: updatedVino });
        } else {
            res.status(404).json({ message: 'Vino not found' });
        }
    } catch (error) {
        console.error('Error updating vino:', error);
        res.status(500).json({ message: 'Error updating vino' });
    }
}

export async function deleteVino(req, res) {
    const id = req.params.id;
    try {
        const deletedVino = await Vino.findByIdAndDelete(id);
        if (deletedVino) {
            res.json({ message: 'Vino deleted', vino: deletedVino });
        } else {
            res.status(404).json({ message: 'Vino not found' });
        }
    } catch (error) {
        console.error('Error deleting vino:', error);
        res.status(500).json({ message: 'Error deleting vino' });
    }
}
