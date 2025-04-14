const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serveeri avalehte
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint arvutuste salvestamiseks
app.post('/api/calculations', async (req, res) => {
    try {
        const { expression, result } = req.body;

        const calculation = await prisma.calculation.create({
            data: {
                expression,
                result,
            },
        });

        res.json(calculation);
    } catch (error) {
        console.error('Viga arvutuse salvestamisel:', error);
        res.status(500).json({ error: 'Viga arvutuse salvestamisel' });
    }
});

// API endpoint arvutuste ajaloo saamiseks
app.get('/api/calculations', async (req, res) => {
    try {
        const calculations = await prisma.calculation.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });

        res.json(calculations);
    } catch (error) {
        console.error('Viga arvutuste ajaloo laadimisel:', error);
        res.status(500).json({ error: 'Viga arvutuste ajaloo laadimisel' });
    }
});

// API endpoint ajaloo kustutamiseks
app.delete('/api/calculations', async (req, res) => {
    try {
        await prisma.calculation.deleteMany({});
        res.json({ message: 'Ajalugu kustutatud' });
    } catch (error) {
        console.error('Viga ajaloo kustutamisel:', error);
        res.status(500).json({ error: 'Viga ajaloo kustutamisel' });
    }
});


// API endpoint arvutuse kustutamiseks
// Käivita server
app.listen(PORT, () => {
    console.log(`Server töötab pordil ${PORT}`);
});

// Sulge Prisma ühendus rakenduse sulgemisel
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});