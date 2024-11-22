import React, { useState, useEffect } from "react";
import api from "../api/api";

interface Question {
    id: number;
    question: string;
    answer: string;
    hint1: string;
    hint2: string;
}

const QuestionsList: React.FC<{ topicId: number }> = ({ topicId }) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get<Question[]>(`/topics/${topicId}/questions`);
                setQuestions(response.data);
            } catch (err) {
                console.error("Failed to fetch questions.");
            }
        };
        fetchQuestions();
    }, [topicId]);

    return (
        <div>
            <h3>Questions</h3>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>
                        <p>{q.question}</p>
                        <p>{q.hint1}</p>
                        <p>{q.hint2}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionsList;
