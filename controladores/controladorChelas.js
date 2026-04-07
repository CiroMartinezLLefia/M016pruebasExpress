import Chela from '../modelos/modeloChelas.js';

export async function getChelas(req, res) {
    try {
        const birras = await Chela.find().sort({ createdAt: -1 });
        res.json(birras);
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
    const { nombre, price, descripcion, tipo, graduacion } = req.body;
    if (!nombre || price === undefined) {
        return res.status(400).json({ message: 'nombre y price son obligatorios' });
    }

    try {
        const newChela = new Chela({
            nombre,
            price,
            descripcion,
            tipo,
            graduacion,
            imagen: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await newChela.save();
        res.status(201).json({ message: 'New chela created', chela: newChela });
    } catch (error) {
        console.error('Error creating chela:', error);
        res.status(500).json({ message: 'Error creating chela' });
    }
}

export async function updateChela(req, res) {
    const id = req.params.id;
    const payload = { ...req.body };

    if (req.file) {
        payload.imagen = `/uploads/${req.file.filename}`;
    }

    try {
        const updatedChela = await Chela.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        });
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
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Chela not found' });
    }
    } catch (error) {
        console.error('Error deleting chela:', error);
        res.status(500).json({ message: 'Error deleting chela' });
    }
}