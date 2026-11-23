// Run the standalone portfolio API beside the primary API on port 5001, with the same CORS settings.
process.env.PORT = process.env.STANDALONE_PORT || "5001";
await import("./index.js");
