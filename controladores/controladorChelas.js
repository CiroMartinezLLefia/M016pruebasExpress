import Chela from '../modelos/modeloChelas.js';

export async function getChelas(req, res) {
    try {
        const birras = await Chela.find();
        res.json(birras);
        return birras;
    } catch (error) {
        console.error('Error fetching chelas:', error);
        res.status(500).json({ message: 'Error fetching chelas' });
    }
}

export async function getChelaById(req, res) {
    const id = req.params.id;
    try {
        const chela = await Chela.findById(id);
        if (chela) {
            res.json(chela);
        } else {
            res.status(404).json({ message: 'Chela not found' });
        }
    } catch (error) {
        console.error('Error fetching chela by ID:', error);
        res.status(500).json({ message: 'Error fetching chela' });
    }
}

export async function createChela(req, res) {
    const { nombre, price } = req.body;
    try {
        const newChela = new Chela({ nombre, price });
        await newChela.save();
        res.json({ message: 'New chela created', chela: newChela });
    } catch (error) {
        console.error('Error creating chela:', error);
        res.status(500).json({ message: 'Error creating chela' });
    }
}

export async function updateChela(req, res) {
    const id = req.params.id;
    const { nombre, price } = req.body;
    try {
        const updatedChela = await Chela.findByIdAndUpdate(id, { nombre, price }, { new: true });
        if (updatedChela) {
            res.json({ message: 'Chela updated', chela: updatedChela });
        } else {
            res.status(404).json({ message: 'Chela not found' });
        }
    } catch (error) {
        console.error('Error updating chela:', error);
        res.status(500).json({ message: 'Error updating chela' });
    }
}

export async function deleteChela(req, res) {
    const id = req.params.id;
    try {
        const deletedChela = await Chela.findByIdAndDelete(id);
        if (deletedChela) {
            res.json({ message: 'Chela deleted', chela: deletedChela });
        } else {
            res.status(404).json({ message: 'Chela not found' });
        }
    } catch (error) {
        console.error('Error deleting chela:', error);
        res.status(500).json({ message: 'Error deleting chela' });
    }
}