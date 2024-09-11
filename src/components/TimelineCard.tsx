import { 
    ActionIcon,
    Card, 
    Group, 
    Stack, 
    Text, 
    Timeline, 
    rem 
} from "@mantine/core";
import { useChosenTopicsStore, useTimelineStore } from "../zustand";
import { IconArrowBackUp, IconRefresh } from "@tabler/icons-react";


export function TimelineCard () {
    const [ timeline, updateTimeline ] = useTimelineStore((state) => [ state.timeline, state.updateTimeline])
    const updateChosenTopics = useChosenTopicsStore((state) => state.updateChosenTopics)

    const handleReset = () => {
        updateTimeline(0)
        updateChosenTopics([])
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
                w="100%"
                h="100%"
                justify="center"
                align="center"
                >
                <Timeline active={timeline}>
                    <Timeline.Item title="Topics">
                        <Text c="dimmed" size="sm">Choose some topics</Text>
                        <Text size="xs" mt={4}></Text>
                    </Timeline.Item>
                    <Timeline.Item title="Email">
                        <Text c="dimmed" size="sm">Generate the email</Text>
                        <Text size="xs" mt={4}></Text>
                    </Timeline.Item>
                    <Timeline.Item title="Finalize">
                        <Text c="dimmed" size="sm">Edit/Send</Text>
                        <Text size="xs" mt={4}></Text>
                    </Timeline.Item>
                </Timeline>
                {timeline > 0 &&
                <Group
                    w="100%"
                    justify="space-evenly"
                    align="center"
                    >
                    <ActionIcon
                        variant="outline"
                        size="xl"
                        radius="xl"
                        onClick={() => updateTimeline(timeline - 1)}
                        >
                        <IconArrowBackUp />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        size="xl"
                        radius="xl"
                        onClick={handleReset}
                        >
                        <IconRefresh />
                    </ActionIcon>
                </Group>
                }
            </Stack>
        </Card>
    )
}