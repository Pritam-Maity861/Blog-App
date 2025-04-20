import React from 'react';

const RecomendedTopics = ({ onTopicSelect = () => {}, selectedTopic = '' }) => {
  const topics = ["All", "Technology", "Lifestyle", "Education", "Health", "Travel", "Business", "other"];

  return (
    <div className="p-8 mt-4 border-l">
      <h4 className="text-sm font-semibold">Recommended Topics</h4>
      <div className="flex-wrap text-sm gap-2 mt-2">
        {topics.map((topic, index) => {
          const isSelected = selectedTopic === topic || (topic === "All" && selectedTopic === '');
          return (
            <button
              key={index}
              onClick={() => onTopicSelect(topic === "All" ? "" : topic)}
              className={`px-5 py-2 mr-2 mt-2 ml-1 border rounded-md ${
                isSelected ? "bg-black text-white" : "bg-white"
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecomendedTopics;
