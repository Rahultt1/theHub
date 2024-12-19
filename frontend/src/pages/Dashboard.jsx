import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import backgroundImage from '../images/117.svg';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const randomSVGs = [
  'https://source.unsplash.com/500x500/?nature',
  'https://source.unsplash.com/500x500/?technology',
  'https://source.unsplash.com/500x500/?city',
  'https://source.unsplash.com/500x500/?forest',
  'https://source.unsplash.com/500x500/?space',
];

const getColorForIndex = (index, total) => {
  const intensity = Math.floor(255 - (index / total) * 200);
  return `rgb(${intensity}, ${intensity}, ${intensity})`;
};

const getTextColor = (bgColor) => {
  const match = bgColor.match(/\d+/g);
  if (!match) return 'black';

  const [r, g, b] = match.map(Number);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128 ? 'black' : 'white';
};

const TopicsSelectionPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [topics, setTopics] = useState([]);
  const [gridColumns, setGridColumns] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/topics');
        const fetchedTopics = response.data.map((topic, index) => ({
          ...topic,
          span: calculateSpan(index),
          discussionCount: topic.discussions ? topic.discussions.length : 0,
          image: randomSVGs[Math.floor(Math.random() * randomSVGs.length)],
          bgColor: getColorForIndex(index, response.data.length),
        }));
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Failed to fetch topics:', error.message);
      }
    };

    fetchTopics();

    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) setGridColumns(4);
      else if (width > 768) setGridColumns(3);
      else setGridColumns(2);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateSpan = (index) => {
    if (index % 5 === 0) return 'row-span-2 col-span-2';
    if (index % 3 === 0) return 'row-span-1 col-span-2';
    return 'row-span-1 col-span-1';
  };

  const handleTopicClick = (topic) => {
    navigate('/discussion', { state: { selectedTopic: topic.title } }); // Navigate to DiscussionBoard
  };

  return (
    <div
      className="flex-1 p-5 mt-4 relative bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative z-10">
        <div className="text-center mb-2 mt-4">
          <h2 className="text-4xl font-bold text-green-600">Pick Your Topic</h2>

          <div className="mt-3 flex justify-center mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search discussions..."
              className="bg-gray-100 p-2 rounded-full mt-8 w-2/6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div
          className="grid mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridAutoRows: '138px',
            gap: '18px',
            maxWidth: '1000px', 
          }}
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              className={topic.span}
              style={{
                gridColumn: `span ${topic.span.includes('col-span-1') ? 1 : 1}`,
                gridRow: `span ${topic.span.includes('row-span-2') ? 2 : 1}`,
              }}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                onClick={() => handleTopicClick(topic)} // Updated to use handleTopicClick
                sx={{
                  backgroundColor: topic.bgColor,
                  backgroundImage: `url(${topic.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  boxShadow: '0px 40px 100px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <div
                  className="absolute inset-0 bg-black bg-opacity-25"
                  style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}
                />
                <CardContent
                  className="p-4"
                  style={{
                    color: getTextColor(topic.bgColor),
                  }}
                >
                  <Typography
                    variant="h5"
                    className="font-semibold tracking-wide"
                    style={{ color: getTextColor(topic.bgColor) }}
                  >
                    {topic.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    style={{
                      color: getTextColor(topic.bgColor) === 'black' ? 'black' : 'white',
                    }}
                  >
                    Posts: {topic.discussionCount}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsSelectionPage;
