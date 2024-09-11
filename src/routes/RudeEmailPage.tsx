import { Button, Card, Chip, Group, Stack, Text, Timeline, Title, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTimelineStore } from "../zustand";
import { TimelineCard } from "../components";


export function RudeEmailPage () {
    const [ timeline, updateTimeline ] = useTimelineStore((state) => [ state.timeline, state.updateTimeline ])
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
        <Stack
            w="100vw"
            justify="start"
            align="center"
            >
            <Stack
                w="100%"
                h="100%"
                justify="start"
                align="center"
                p="xl"
                ta="center"
                maw={rem(600)}
                >
                <Card
                    radius="xl"
                    shadow="md"
                    p="xl"
                    w="100%"
                    >
                    <Stack justify="center" align="center">
                        <Title>Ultimate Generator</Title>
                        <Text>Craft the perfect snarky, sarcastic, or downright rude email in seconds!</Text>
                    </Stack>
                </Card>
                    <Group
                        w="100%"
                        justify="space-evenly"
                        align="center"
                        >
                        <Stack 
                            justify="center"
                            align="center"
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
                        <TimelineCard />
                    </Group>
            </Stack>
        </Stack>
    )
}