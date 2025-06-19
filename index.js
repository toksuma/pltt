const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('🚀 Server đang chạy tại http://localhost:3000');
});
