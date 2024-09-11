import { 
    Card, 
    Group, 
    Stack, 
    Text, 
    Title, 
    rem 
} from "@mantine/core";
import { 
    GenerateEmailCard,
    TimelineCard, 
    TopicsCard
} from "../components";
import { useCallback } from "react";
import { useTimelineStore } from "../zustand";

export function RudeEmailPage () {

    const timeline = useTimelineStore((state) => state.timeline)

    const StateRenderer = useCallback(() => {
        switch (timeline) {
            case 0:
                return <TopicsCard />
            case 1:
                return <GenerateEmailCard />
        }
    },[timeline])

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
                        <StateRenderer />
                        <TimelineCard />
                    </Group>
            </Stack>
        </Stack>
    )
}