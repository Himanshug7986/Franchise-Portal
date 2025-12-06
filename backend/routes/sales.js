import express from 'express';
import Sales from '../models/Sales.js';
import { verifyToken, checkAcceptedStatus } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', verifyToken, checkAcceptedStatus, async (req, res) => {
    try {
        const { date, numberOfCustomers, totalRevenue } = req.body;

        if (!date || numberOfCustomers === undefined || totalRevenue === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSales = new Sales({
            user: req.user._id,
            date,
            numberOfCustomers,
            totalRevenue
        });

        await newSales.save();

        res.status(201).json({ message: 'Sales data added successfully', sales: newSales });
    } catch (error) {
        console.error('Error adding sales:', error);
        res.status(500).json({ message: 'Server error adding sales data' });
    }
});

router.get('/', verifyToken, checkAcceptedStatus, async (req, res) => {
    try {
        const sales = await Sales.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ message: 'Server error fetching sales data' });
    }
});

export default router;
