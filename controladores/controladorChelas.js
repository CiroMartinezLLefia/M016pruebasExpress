const chelas = [
    { id: 1, name: "Chela Rubia", description: "Una rubia bien fría" },
    { id: 2, name: "Chela Tostada", description: "Con sabor intenso" },
    { id: 3, name: "Chela IPA", description: "Amargor potente" }
];

export function getChelas(req, res) {
    res.json(chelas);
    return chelas;
}

export function getChelasById(req, res) {
    const id = parseInt(req.params.id);
    const chela = chelas.find(c => c.id === id);
    res.json(chela);
}

export function createChela(req, res) {
    const newChela = req.body;
    chelas.push(newChela);
    res.json({ message: "New chela created", chela: newChela });
}

export function updateChela(req, res) {
    const id = parseInt(req.params.id);
    const updatedChela = req.body;
    const index = chelas.findIndex(c => c.id === id);

    if (index !== -1) {
        chelas[index] = { ...chelas[index], ...updatedChela };
        res.json({ message: "Chela updated", chela: chelas[index] });
    } else {
        res.status(404).json({ message: "Chela not found" });
    }
}

export function deleteChela(req, res) {
    const id = parseInt(req.params.id);
    const index = chelas.findIndex(c => c.id === id);

    if (index !== -1) {
        const deletedChela = chelas.splice(index, 1);
        res.json({ message: "Chela deleted", chela: deletedChela[0] });
    } else {
        res.status(404).json({ message: "Chela not found" });
    }
}