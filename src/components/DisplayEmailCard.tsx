import { 
    ActionIcon,
    Badge,
    Card, 
    Group, 
    Stack, 
    Text, 
    Title, 
    rem
} from "@mantine/core";
import { useChosenTopicsStore, useEmailTemplateStore } from "../zustand";
import { IconDownload, IconShare2 } from "@tabler/icons-react";


export function DisplayEmailCard () {
    const chosenTopics = useChosenTopicsStore((state) => state.chosenTopics)
    const [ to, from ] = useEmailTemplateStore((state) => [ state.to, state.from ])

    return(
        <Card
            radius="xl"
            shadow="md"
            p="xl"
            h={rem(300)}
            w={rem(250)}
            maw={'90%'}
            >
            <Stack
            w="100%"
            h="100%"
            justify="space-between"
            align="center"
            >
                <Stack
                >
                    <Title order={4} td="underline">Topics</Title>
                    <Group
                    w="100%"
                    justify="center"
                    align="center"
                    >
                        {chosenTopics.map((topic, i) => {
                            return(
                                <Badge key={i}>{topic}</Badge>
                            )
                        })}
                    </Group>
                </Stack>
                <Group
                    w="100%"
                    justify="space-evenly"
                    align="center"
                    >
                    <Stack>
                        <Title order={4} td="underline">To</Title>
                        <Text>{to}</Text>
                    </Stack>
                    <Stack>
                        <Title order={4} td="underline">From</Title>
                        <Text>{from}</Text>
                    </Stack>
                </Group>
                <Group
                    w="100%"
                    justify="space-evenly"
                    align="center"
                    >
                    <ActionIcon
                        radius="md"
                        size="xl"
                        variant="light"
                        >
                        <IconShare2 />
                    </ActionIcon>
                    <ActionIcon
                        radius="md"
                        size="xl"
                        variant="light"
                        >
                        <IconDownload />
                    </ActionIcon>
                </Group>
            </Stack>
        </Card>
    )
}