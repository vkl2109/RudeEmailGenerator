import { ActionIcon, Button, Card, Chip, Group, Stack, rem } from "@mantine/core";
import { useChosenTopicsStore, useTimelineStore } from "../zustand";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconArrowRight, IconReload } from "@tabler/icons-react";
import { functions } from '../../firebase'
import { httpsCallable } from "firebase/functions";

export function TopicsCard () {
    const updateTimeline = useTimelineStore((state) => state.updateTimeline )
    const updateChosenTopics = useChosenTopicsStore((state) => state.updateChosenTopics)
    const [ loadingTopics, setLoadingTopics ] = useState<boolean>(false)
    const [ topics, setTopics ] = useState<string[]>([])
    const [ chosenTopics, setChosenTopics ] = useState<Set<string>>(new Set())

    interface topicsData {
        success: boolean;
        newTopics: {
            one: string;
            two: string;
            three: string;
        };
    }

    const generateTopics = async () => {
        try {
            setLoadingTopics(true)
            const generateTopics = httpsCallable(functions, 'generateTopics')
            const topicsResult = await generateTopics()
            const results = topicsResult.data as topicsData
            if (!results?.success) throw new Error('failed')
            const newTopicsData: string[] = Object.values(results?.newTopics)
            setTopics(newTopicsData)
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

    const handleSubmit = async () => {
        try {
            updateChosenTopics(Array.from(chosenTopics))
            updateTimeline(1)
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Oops!',
                message: 'Please Try Again'
            })
        }
    }

    const handleCheckTopic = (topic: string) => {
        const newTopics = new Set(chosenTopics)
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
            w={rem(250)}
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
                <Stack
                    w="100%"
                    h="100%"
                    justify="space-between"
                    >
                    <Group
                        
                        >
                        <ActionIcon
                            variant="transparent"
                            onClick={() => setTopics([])}
                            >
                            <IconArrowLeft />
                        </ActionIcon>                        
                    </Group>
                    <Stack
                        w="100%"
                        gap="md"
                        justify="center"
                        align="center"
                        >
                        {topics.map((topic, i) => {
                            return(
                                <Chip
                                key={i}
                                checked={chosenTopics.has(topic)}
                                onClick={() => handleCheckTopic(topic)}
                                >
                                    {topic}
                                </Chip>
                            )
                        })}
                    </Stack>
                    <Group
                        w="100%"
                        justify="space-between"
                        >
                        <ActionIcon
                            variant="outline"
                            radius="xl"
                            size="xl"
                            onClick={generateTopics}
                            >
                            <IconReload />
                        </ActionIcon>
                        <ActionIcon
                            variant="light"
                            disabled={chosenTopics.size == 0}
                            radius="xl"
                            size="xl"
                            onClick={handleSubmit}
                            >
                            <IconArrowRight />
                        </ActionIcon>
                    </Group>
                </Stack>
                }
            </Stack>
        </Card>
    )
}