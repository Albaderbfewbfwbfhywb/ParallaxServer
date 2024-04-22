const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3030;

// Enable CORS for all requests
app.use(cors());

// Load data from JSON file
const rawData = fs.readFileSync('./data/profiles.json');
const peopleData = JSON.parse(rawData).profiles;

// Endpoint to fetch paginated data
app.get('/api/profile', (req, res) => {
    // Get query parameters (page number and page size)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Calculate start index and end index for pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, peopleData.length);

    // Slice the array to get the paginated data
    const paginatedData = peopleData.slice(startIndex, endIndex);

    // Return paginated data as JSON response
    res.json({
        page,
        pageSize,
        totalPages: Math.ceil(peopleData.length / pageSize),
        totalItems: peopleData.length,
        data: paginatedData
    });
});

app.get('/', (req, res) => {
    res.send("Hello World");
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});