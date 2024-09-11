import { 
    Card, 
    Center, 
    Text, 
    Timeline, 
    rem 
} from "@mantine/core";
import { useTimelineStore } from "../zustand";


export function TimelineCard () {
    const timeline = useTimelineStore((state) => state.timeline)

    return(
        <Card
            radius="xl"
            shadow="md"
            p="xl"
            h={rem(300)}
            w={rem(250)}
            >
            <Center
                w="100%"
                h="100%"
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
            </Center>
        </Card>
    )
}