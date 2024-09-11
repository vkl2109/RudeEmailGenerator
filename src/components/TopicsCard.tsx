import { Button, Card, Chip, Stack, rem } from "@mantine/core";
import { useTimelineStore } from "../zustand";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export function TopicsCard () {
    const updateTimeline = useTimelineStore((state) => state.updateTimeline )
    const [ loadingTopics, setLoadingTopics ] = useState<boolean>(false)
    const [ topics, setTopics ] = useState<string[]>([])
    const [ chosenTopics, setChosenTopics ] = useState<Set<string>>(new Set())

    const generateTopics = async () => {
        try {
            setLoadingTopics(true)
            setTopics(['one','two', 'three'])
            updateTimeline(1)
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Oops!',
                message: 'Please Try Again'
            })
        } finally {
            setLoadingTopics(false)
        }
    }

    const handleCheckTopic = (topic: string) => {
        let newTopics = new Set(chosenTopics)
        if (chosenTopics.has(topic)) {
            newTopics.delete(topic)
        } else {
            newTopics.add(topic)
        }
        setChosenTopics(newTopics)
    }

    return(
        <Card
            radius="xl"
            shadow="md"
            p="xl"
            h={rem(300)}
            >
            <Stack 
                justify="center"
                align="center"
                w="100%"
                h="100%"
                >
                {topics.length == 0 ?
                <Button
                    size="lg"
                    radius="xl"
                    variant="light"
                    loading={loadingTopics}
                    onClick={generateTopics}
                    >
                    Generate Topics
                </Button>
                :
                (topics.map((topic, i) => {
                    return(
                        <Chip
                        key={i}
                        checked={chosenTopics.has(topic)}
                        onClick={() => handleCheckTopic(topic)}
                        >
                            {topic}
                        </Chip>
                    )
                }))
                }
            </Stack>
        </Card>
    )
}