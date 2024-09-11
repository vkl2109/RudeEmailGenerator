import { 
    ActionIcon,
    Badge,
    Card, 
    CopyButton, 
    Group, 
    Stack, 
    Text, 
    Title, 
    Tooltip, 
    rem
} from "@mantine/core";
import { useChosenTopicsStore, useEmailTemplateStore } from "../zustand";
import { IconCheck, IconCopy, IconSend } from "@tabler/icons-react";
import { useMemo } from "react";

export function DisplayEmailCard () {
    const chosenTopics = useChosenTopicsStore((state) => state.chosenTopics)
    const [ to, body, from ] = useEmailTemplateStore((state) => [ state.to, state.body, state.from ])

    const mailToLink = useMemo(() => {
        const sendEmail = `Dear ${to},\n\n${body}\n\nInsincerely,\n${from}`;
        const encodedBody = encodeURIComponent(sendEmail);
        const mailtoLink = `mailto:?body=${encodedBody}`;
        return mailtoLink;
    },[to, body, from])

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
                    <CopyButton value="https://mantine.dev">
                        {({ copied, copy }) => (
                            <Tooltip label="copy" position="bottom">
                                <ActionIcon 
                                    color={copied ? 'teal' : 'blue'} 
                                    onClick={copy}
                                    radius="xl"
                                    size="xl"
                                    variant="outline"
                                    >
                                    {copied ? <IconCheck /> : <IconCopy />}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                    <Tooltip label="send" position="bottom">
                        <ActionIcon
                            radius="xl"
                            size="xl"
                            variant="light"
                            component="a"
                            href={mailToLink}
                            >
                            <IconSend />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Stack>
        </Card>
    )
}