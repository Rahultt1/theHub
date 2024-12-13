const axios = require("axios");
const Discussion = require("../models/Discussion");

const addDiscussion = async (req, res) => {
  const { topicId, subtopic, question, link, uploads } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:5000/api/discussions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Response from backend:", response.data);
  } catch (error) {
    console.log("Error Response Details:", error.response?.data || error.message);
    console.error("Failed to add discussion: ", error.response?.data?.message || "Unknown error.");
    res.status(500).json({
      message: error.response?.data?.message || "Unknown error",
      error: true,
    });
  }
};

module.exports = { addDiscussion };