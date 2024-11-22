import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Modal,
    Box,
    TextField,
} from "@mui/material";
import api from "../api/api";

interface Question {
    id: number;
    question: string;
    answer: string;
    hint1: string;
    hint2: string;
}

interface TopicDetailsProps {
    topicId: number;
    topicName: string;
    onBack: () => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({ topicId, topicName, onBack }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        hint1: "",
        hint2: "",
    });

    // Fetch questions for the selected topic
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get<Question[]>(`/topics/${topicId}/questions`);
                setQuestions(response.data);
            } catch (err) {
                alert("Failed to fetch questions.");
            }
        };
        fetchQuestions();
    }, [topicId]);

    // Handle Add Question Form Submission
    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post(`/topics/${topicId}/questions`, formData);
            setQuestions([...questions, response.data]); // Add the new question to the list
            setFormData({ question: "", answer: "", hint1: "", hint2: "" });
            setModalOpen(false); // Close the modal
            alert("Question added successfully!");
        } catch (err) {
            alert("Failed to add question.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Toggle the visibility of the answer for a specific question
    const toggleAnswerVisibility = (id: number) => {
        setRevealedAnswers((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div>
            {/* Back Button */}
            <Button onClick={onBack} variant="contained" sx={{ mb: 2 }}>
                Back to Topics
            </Button>

            {/* Topic Title */}
            <Typography variant="h4" sx={{ mb: 3 }}>
                {topicName}
            </Typography>

            {/* Add Question Button */}
            <Button
                onClick={() => setModalOpen(true)}
                variant="contained"
                color="secondary"
                sx={{ mb: 3 }}
            >
                Add Question
            </Button>

            {/* Questions Grid */}
            <Grid container spacing={3}>
                {questions.map((q) => (
                    <Grid item xs={12} sm={6} key={q.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{q.question}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Hint 1: {q.hint1}
                                </Typography>
                                <Typography variant="body2">Hint 2: {q.hint2}</Typography>

                                {/* Show/Hide Answer Button */}
                                {!revealedAnswers[q.id] ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => toggleAnswerVisibility(q.id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Show Answer
                                    </Button>
                                ) : (
                                    <div>
                                        <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
                                            Answer: {q.answer}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => toggleAnswerVisibility(q.id)}
                                            sx={{ mt: 2 }}
                                        >
                                            Hide Answer
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Question Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: "400px",
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Add a New Question
                    </Typography>
                    <form onSubmit={handleAddQuestion}>
                        <TextField
                            fullWidth
                            label="Question"
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Answer"
                            name="answer"
                            value={formData.answer}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Hint 1"
                            name="hint1"
                            value={formData.hint1}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Hint 2"
                            name="hint2"
                            value={formData.hint2}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button onClick={() => setModalOpen(false)} variant="outlined">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add Question
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TopicDetails;
