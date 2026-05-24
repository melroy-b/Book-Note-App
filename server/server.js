import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Start the Express API server on the configured port.
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
