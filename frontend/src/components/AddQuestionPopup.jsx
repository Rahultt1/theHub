// Import other required modules and hooks...

const AddQuestionPopup = ({ onClose, fetchDiscussions }) => {
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [question, setQuestion] = useState("");
  const [link, setLink] = useState("");
  const [uploads, setUploads] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Check token availability and validity
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a discussion.");
      onClose(); // Close the popup if no token exists
      return;
    }

    fetchTopics(); // Fetch topics if authenticated
    setIsVisible(true);
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/topics");
      setTopics(response.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error.message);
      alert("Failed to load topics. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedFiles = files.map((file) => ({
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "file",
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setUploads((prevUploads) => [...prevUploads, ...uploadedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topicId || !question) {
      alert("Please select a topic and add a question before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a discussion.");
      return;
    }

    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("subtopic", subtopic);
    formData.append("question", question);
    formData.append("link", link);
    uploads.forEach((file, i) => formData.append(`uploads[${i}]`, file.file));

    try {
      const response = await axios.post(
          "http://localhost:5000/api/discussions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );

      console.log("Discussion added successfully:", response.data);
      fetchDiscussions();
      setIsVisible(false);
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.error("Failed to add discussion:", error.response?.data || error.message);
      alert("Error adding discussion: " + (error.response?.data?.message || "Unknown error."));
    }
  };

  // Close the popup animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 500);
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-center">
        <div
            className="bg-black bg-opacity-50 fixed inset-0"
            onClick={handleClose}
        ></div>
        <div className={`bg-white rounded-l-lg shadow-xl w-full h-full transform transition-transform duration-500 ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6">
            <h2>Create New Discussion</h2>
            {/* Form Code */}
          </div>
        </div>
      </div>
  );
};

export default AddQuestionPopup;