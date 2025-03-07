import React, { useState, useEffect } from "react";

const SleepStory = () => {
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/sleepstory/daily")
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, []);

  return (
    <div>
      <h2>Tonight's Sleep Story</h2>
      {story ? (
        <div>
          <h3>{story.title} - {story.author}</h3>
          <p>{story.description}</p>
          <audio controls>
            <source src={story.audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SleepStory;
