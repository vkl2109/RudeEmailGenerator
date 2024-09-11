import { 
    Card, 
    Group, 
    Stack, 
    Text
} from "@mantine/core";
import { useEmailTemplateStore } from "../zustand";


export function EditEmailCard () {
    const [ to, body, from ] = useEmailTemplateStore((state) => [ state.to, state.body, state.from ])

    return(
        <Card
            radius="xl"
            shadow="md"
            p="xl"
            w={"100%"}
            >
            <Stack
                h="100%"
                w="100%"
                justify="space-between"
                align="center"
                >
                <Group
                    w="100%"
                    justify="flex-start"
                    align="center"
                    >
                    <Text>Dear {to},</Text>
                </Group>
                <Text>{body}</Text>
                <Group
                    w="100%"
                    justify="flex-end"
                    align="center"
                    >
                    <Stack gap={0} align="flex-end">
                        <Text>Insincerely, </Text>
                        <Text>{from}</Text>
                    </Stack>
                </Group>
            </Stack>
        </Card>
    )
}