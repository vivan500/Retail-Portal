import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

// Sample products data
const sampleProducts = [
    // Pizzas
    {
        name: 'Margherita Pizza',
        category: 'Pizza',
        price: 299,
        inventoryCount: 50,
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    },
    {
        name: 'Pepperoni Pizza',
        category: 'Pizza',
        price: 399,
        inventoryCount: 45,
        description: 'Loaded with pepperoni and cheese',
    },
    {
        name: 'Veggie Supreme Pizza',
        category: 'Pizza',
        price: 349,
        inventoryCount: 40,
        description: 'Fresh vegetables with cheese and herbs',
    },
    {
        name: 'BBQ Chicken Pizza',
        category: 'Pizza',
        price: 449,
        inventoryCount: 35,
        description: 'Grilled chicken with BBQ sauce and onions',
    },
    {
        name: 'Hawaiian Pizza',
        category: 'Pizza',
        price: 379,
        inventoryCount: 30,
        description: 'Ham and pineapple with cheese',
    },

    // Drinks
    {
        name: 'Coca Cola',
        category: 'Drinks',
        price: 50,
        inventoryCount: 100,
        description: 'Chilled Coca Cola 500ml',
    },
    {
        name: 'Pepsi',
        category: 'Drinks',
        price: 50,
        inventoryCount: 100,
        description: 'Chilled Pepsi 500ml',
    },
    {
        name: 'Fresh Orange Juice',
        category: 'Drinks',
        price: 80,
        inventoryCount: 60,
        description: 'Freshly squeezed orange juice',
    },
    {
        name: 'Iced Tea',
        category: 'Drinks',
        price: 60,
        inventoryCount: 75,
        description: 'Refreshing iced tea with lemon',
    },
    {
        name: 'Mineral Water',
        category: 'Drinks',
        price: 20,
        inventoryCount: 150,
        description: 'Pure mineral water 1L',
    },

    // Bread
    {
        name: 'Garlic Bread',
        category: 'Bread',
        price: 120,
        inventoryCount: 55,
        description: 'Toasted bread with garlic butter',
    },
    {
        name: 'Cheese Garlic Bread',
        category: 'Bread',
        price: 150,
        inventoryCount: 50,
        description: 'Garlic bread topped with melted cheese',
    },
    {
        name: 'Breadsticks',
        category: 'Bread',
        price: 100,
        inventoryCount: 65,
        description: 'Crispy breadsticks with herbs',
    },
    {
        name: 'Stuffed Garlic Bread',
        category: 'Bread',
        price: 180,
        inventoryCount: 40,
        description: 'Garlic bread stuffed with cheese and vegetables',
    },
];

// Seed function
const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Inserted ${products.length} products`);

        console.log('\n📦 Sample Products:');
        products.forEach((product) => {
            console.log(`  - ${product.name} (${product.category}) - ₹${product.price} - Stock: ${product.inventoryCount}`);
        });

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed
seedDatabase();
