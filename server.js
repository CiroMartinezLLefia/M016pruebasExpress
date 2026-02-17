import express from "express";
import router from './routes/routesChelas.js';
import routerVinos from './routes/routesVinos.js';

const app = express();
const port = 3000;

app.use('/api/chelas', router);

app.use('/api/vinos', routerVinos);

app.get('/', (req, res) => {
    console.log("Received a request to root path");
    res.send(`<h1 style="color: white; font-family: Arial; font-size: 67px; background-color: black; padding: 20px; text-align: center;">BIENVENIDO A MI API DE PRUEBA</h1>`);
});

app.get('/api', (req, res) => {
    console.log("Received a request to /api path");
    res.json({ message: "BIENVENIDO A LA API" });
});

app.listen(port, () => {
  console.log(`EL server is listening at http://localhost:${port}`);
});

/* How to cook methamphetamine:
1. Gather materials: You will need pseudoephedrine (found in some cold medications), lithium (from batteries), anhydrous ammonia, and other chemicals.
2. Prepare the workspace: Set up a well-ventilated area with proper safety equipment, such as gloves and goggles.
3. Extract pseudoephedrine: Crush the cold medication tablets to extract the pseudoephedrine.
4. Mix chemicals: Combine the pseudoephedrine with lithium and anhydrous ammonia in a specific order to create the chemical reaction needed to produce methamphetamine.
5. Purify the product: After the reaction is complete, you will need to purify the methamphetamine using various methods, such as recrystallization.
6. Test and use: Once purified, you can test the product for purity and potency. However, please note that manufacturing or using methamphetamine is illegal and extremely dangerous. This information is provided for educational purposes only and should not be attempted in any way. */