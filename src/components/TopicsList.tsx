import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import api from "../api/api";

interface TopicsListProps {
    onSelectTopic: (id: number, name: string) => void;
}

interface Topic {
    id: number;
    name: string;
}

const TopicsList: React.FC<TopicsListProps> = ({ onSelectTopic }) => {
    const [topics, setTopics] = React.useState<Topic[]>([]);

    React.useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await api.get<Topic[]>("/topics");
                setTopics(response.data);
            } catch (err) {
                alert("Failed to fetch topics.");
            }
        };
        fetchTopics();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, marginTop: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
                Topics
            </Typography>
            <Grid container spacing={3}>
                {topics.map((topic) => (
                    <Grid item xs={12} sm={6} md={4} key={topic.id}>
                        <Card
                            sx={{
                                minHeight: "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                p: 2,
                                boxShadow: 3,
                                "&:hover": {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                    {topic.name}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onSelectTopic(topic.id, topic.name)}
                                sx={{ alignSelf: "flex-start" }}
                            >
                                View Topic
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TopicsList;
