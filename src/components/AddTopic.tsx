import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../api/api";

interface AddTopicProps {
    onBack: () => void;
}

const AddTopic: React.FC<AddTopicProps> = ({ onBack }) => {
    const [topicName, setTopicName] = useState("");

    const handleAddTopic = async () => {
        try {
            await api.post("/topics", { name: topicName });
            alert("Topic added successfully!");
            onBack();
        } catch (err) {
            alert("Failed to add topic.");
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Add a New Topic
            </Typography>
            <TextField
                fullWidth
                label="Topic Name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={onBack} variant="outlined">
                    Back
                </Button>
                <Button onClick={handleAddTopic} variant="contained" color="primary">
                    Add Topic
                </Button>
            </Box>
        </Box>
    );
};

export default AddTopic;
