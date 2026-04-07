import Pedido from '../modelos/modeloPedidos.js';
import Vino from '../modelos/modeloVinos.js';
import Chela from '../modelos/modeloChelas.js';
import { enviarCorreoPedido } from '../src/services/mailService.js';

function obtenerModelo(tipo) {
  if (tipo === 'vino') {
    return { Modelo: Vino, modelName: 'Vino' };
  }
  if (tipo === 'chela') {
    return { Modelo: Chela, modelName: 'Chela' };
  }
  return null;
}

export async function crearPedido(req, res) {
  try {
    const { items, observaciones } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items es obligatori i no pot estar buit' });
    }

    const itemsPedido = [];
    let total = 0;

    for (const item of items) {
      const { tipusProducte, producteId, cantidad } = item;
      if (!tipusProducte || !producteId || !cantidad) {
        return res.status(400).json({ error: 'Cada item necessita tipusProducte, producteId i cantidad' });
      }

      const modelInfo = obtenerModelo(tipusProducte);
      if (!modelInfo) {
        return res.status(400).json({ error: `Tipus de producte invalid: ${tipusProducte}` });
      }

      const producte = await modelInfo.Modelo.findById(producteId);
      if (!producte) {
        return res.status(400).json({ error: `Producte no trobat: ${producteId}` });
      }

      const nombre = producte.name || producte.nombre || 'Producte';
      const precioUnitario = producte.price;
      const subtotal = Number(precioUnitario) * Number(cantidad);
      total += subtotal;

      itemsPedido.push({
        tipusProducte,
        producteId,
        model: modelInfo.modelName,
        nombre,
        cantidad: Number(cantidad),
        precioUnitario
      });
    }

    const pedido = await Pedido.create({
      usuario: req.usuari._id,
      items: itemsPedido,
      total,
      observaciones: observaciones || ''
    });

    let mailStatus = 'sent';
    try {
      const ownerMail = process.env.OWNER_EMAIL;
      if (!ownerMail) {
        throw new Error('OWNER_EMAIL no configurat');
      }

      const resumen = itemsPedido
        .map((item) => `- ${item.nombre} x${item.cantidad} (${item.precioUnitario} EUR)`)
        .join('\n');

      await enviarCorreoPedido({
        to: ownerMail,
        subject: `Nova comanda #${pedido._id}`,
        text: `Usuari: ${req.usuari.email}\nTotal: ${total.toFixed(2)} EUR\n\n${resumen}`,
        html: `<p><strong>Usuari:</strong> ${req.usuari.email}</p><p><strong>Total:</strong> ${total.toFixed(2)} EUR</p><pre>${resumen}</pre>`
      });
    } catch (mailErr) {
      mailStatus = 'failed';
      console.error('Error enviant correu de comanda:', mailErr.message);
    }

    res.status(201).json({ pedido, mailStatus });
  } catch (error) {
    console.error('Error creating pedido:', error);
    res.status(500).json({ error: 'Error creating pedido' });
  }
}

export async function listarMisPedidos(req, res) {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuari._id }).sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    res.status(500).json({ error: 'Error fetching pedidos' });
  }
}
