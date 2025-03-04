import React, { useState } from "react";
import axios from "axios";

const SelfAssessment = () => {
  const [conversation, setConversation] = useState("");
  const [question, setQuestion] = useState("Hello! Let's begin the assessment.");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [finalResponse, setFinalResponse] = useState(null);

  const handleAnswer = async (answer) => {
    if (loading || questionCount >= 20) return; // ✅ Stops at 20 questions
    setLoading(true);
  
    const updatedConversation = conversation + `User: ${answer}\n`;
    const nextCount = questionCount + 1;
  
    try {
      const { data } = await axios.post("http://localhost:5000/api/assessment", {
        conversation: updatedConversation,
        questionCount: nextCount
      });
  
      setTimeout(() => {
        if (nextCount === 20) {
          setFinalResponse(data.response); // ✅ Show Final Diagnosis after 20 questions
        } else {
          setConversation(updatedConversation + `Bot: ${data.response}\n`);
          setQuestion(data.response);
        }
        setQuestionCount(nextCount);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error communicating with Gemini API", error);
      setLoading(false);
    }
  };
  
  
  

  return (
    <div>
      <h2>Self-Assessment Chat</h2>
      {finalResponse ? (
        <h3>Final Diagnosis: {finalResponse}</h3>
      ) : (
        <>
          <p>{question}</p>
          {loading ? <p>Loading...</p> : (
            <>
              <button onClick={() => handleAnswer("Often")} disabled={loading}>Often</button>
              <button onClick={() => handleAnswer("Never")} disabled={loading}>Never</button>
              <button onClick={() => handleAnswer("Sometimes")} disabled={loading}>Sometimes</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelfAssessment;


