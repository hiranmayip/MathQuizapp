import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface AddQuestionProps {
    topicId: number;
    onBack: () => void; // Add this prop
}

const AddQuestion: React.FC<AddQuestionProps> = ({ topicId, onBack }) => {
    const [formData, setFormData] = React.useState({
        question: "",
        answer: "",
        hint1: "",
        hint2: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Replace with your API call logic
            console.log("Submitted question:", formData);
            setFormData({ question: "", answer: "", hint1: "", hint2: "" });
            alert("Question added successfully!");
        } catch (err) {
            alert("Failed to add question.");
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Add a Question to Topic ID: {topicId}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Question (LaTeX)"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="e.g., \\(x^2 + y^2 = z^2\\)"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Answer (LaTeX)"
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="e.g., \\(z = \\sqrt{x^2 + y^2}\\)"
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
                    <Button onClick={onBack} variant="outlined">
                        Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Question
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddQuestion;
