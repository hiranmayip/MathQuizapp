import React, { useState } from "react";
import { Container, Typography, Button, AppBar, Toolbar } from "@mui/material";
import TopicsList from "./components/TopicsList";
import AddTopic from "./components/AddTopic";
import TopicDetails from "./components/TopicDetails";

const App: React.FC = () => {
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [selectedTopicName, setSelectedTopicName] = useState<string | null>(null);
    const [view, setView] = useState<"topics" | "addTopic" | "topicDetails">("topics");

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Math Quiz App
                    </Typography>
                    {/* Add Topic Button: Only visible when on the Topics List view */}
                    {view === "topics" && (
                        <Button color="inherit" onClick={() => setView("addTopic")}>
                            Add Topic
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: 4 }}>
                {/* Topics List */}
                {view === "topics" && (
                    <TopicsList
                        onSelectTopic={(id, name) => {
                            setSelectedTopicId(id);
                            setSelectedTopicName(name);
                            setView("topicDetails");
                        }}
                    />
                )}

                {/* Add Topic View */}
                {view === "addTopic" && (
                    <AddTopic
                        onBack={() => setView("topics")}
                    />
                )}

                {/* Topic Details View */}
                {view === "topicDetails" && selectedTopicId && (
                    <TopicDetails
                        topicId={selectedTopicId}
                        topicName={selectedTopicName || ""}
                        onBack={() => {
                            setSelectedTopicId(null);
                            setSelectedTopicName(null);
                            setView("topics");
                        }}
                    />
                )}
            </Container>
        </div>
    );
};

export default App;
