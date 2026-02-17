const vinos = [
        { id: 1, name: "Vino Albino", description: "Un vino de mierda"},
        { id: 2, name: "Vino Reserva", description: "Un vino decentillo"},
        { id: 3, name: "Vino Gran Reserva", description: "Un asco, menudo vino más rancio" }
];

export function getAlbinos(req, res) {
    res.json(vinos);
    return vinos;
}

export function getAlbinosById(req, res) {
    const id = parseInt(req.params.id);
    const vino = vinos.find(v => v.id === id);
    res.json(vino);
}
