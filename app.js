require('dotenv').config();
const express=require('express');
const app=express();
app.use(express.json());
app.use('/api/github',require('./routes/githubRoutes'));
app.listen(process.env.PORT||5000,()=>console.log('Server running'));
