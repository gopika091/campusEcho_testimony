const express = require("express"); // Import the Express framework
const multer = require("multer"); // Import the Multer middleware for handling file uploads
const cors = require("cors"); // Import the CORS middleware for handling Cross-Origin Resource Sharing
const { google } = require("googleapis"); // Import the Google APIs client library
const fs = require("fs"); // Import the Node.js File System module
const path = require("path"); // Import the Node.js Path module

const app = express(); // Create an Express application
app.use(express.static(".")); // Serve static files from the current directory

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "OPTIONS"], // Allow GET, POST, and OPTIONS methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
  })
);

const upload = multer({ dest: "uploads/" }); // Configure Multer to save uploaded files to the "uploads" directory

app.post("/upload", upload.single("video"), async (req, res) => {
  // Define a POST route for uploading a video
  if (!req.file) {
    // Check if a file was uploaded
    console.error("No file uploaded"); // Log an error message if no file was uploaded
    return res.status(400).send("No file uploaded."); // Send a 400 response if no file was uploaded
  }

  // Collect user info from the form fields
  const userInfo = {
    name: req.body.name || "",
    email: req.body.email || "",
    role: req.body.role || "",
  };
  console.log("User Info:", userInfo);

  try {
    console.log("File received:", req.file); // Log the received file information

    // Authenticate with Google API
    const auth = new google.auth.GoogleAuth({
      keyFile: "vedio-testimonal-tool-461217-deea1e0fcb41.json", // Path to the service account key file
      scopes: ["https://www.googleapis.com/auth/drive.file"], // Scopes for accessing Google Drive
    });

    const driveService = google.drive({ version: "v3", auth }); // Create a Google Drive service client
    const fileMetadata = {
      name: `${req.file.originalname}`, // Name of the file to be uploaded
      parents: ["1acfTaR5cWC34xkyCLXf3LbPXQKanBC7W"], // Parent folder ID in Google Drive
      description: `Name: ${userInfo.name}, Email: ${userInfo.email}, Role: ${userInfo.role}`, // Description with user info
    };
    const media = {
      mimeType: req.file.mimetype, // MIME type of the uploaded file
      body: fs.createReadStream(req.file.path), // Use the correct file path for the uploaded file
    };

    // Upload the file to Google Drive
    const file = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Ensure the description is set (sometimes Google Drive API may not set it on upload)
    await driveService.files.update({
      fileId: file.data.id,
      resource: {
        description: fileMetadata.description,
      },
    });

    console.log("File uploaded to Google Drive:", file.data.id); // Log the ID of the uploaded file

    fs.unlinkSync(path.join(__dirname, req.file.path)); // Delete the file from the local storage after upload

    res.send(`File uploaded successfully: ${file.data.id}`); // Send a success response with the file ID
  } catch (error) {
    if (error.response) {
      // Check if there is an error response from Google Drive API
      console.error(
        "Error response from Google Drive API:",
        error.response.data
      ); // Log the error response data
    } else {
      console.error("Error uploading to Google Drive:", error); // Log the error if it is not an API response error
    }
    res.status(500).send("Error uploading to Google Drive"); // Send a 500 response if there was an error
  }
});

const PORT = process.env.PORT || 3000; // Set the port to the environment variable PORT or default to 3001
app.listen(PORT, () => {
  // Start the Express server
  console.log(`Server running on port ${PORT}`); // Log the port the server is running on
});
