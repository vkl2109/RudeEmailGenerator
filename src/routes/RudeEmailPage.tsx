import { 
    Card, 
    Group, 
    Stack, 
    Text, 
    Title, 
    rem 
} from "@mantine/core";
import { 
    TimelineCard, 
    TopicsCard
} from "../components";

export function RudeEmailPage () {

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
                        <TopicsCard />
                        <TimelineCard />
                    </Group>
            </Stack>
        </Stack>
    )
}