import { Group, rem, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";


export function RootHeader () {
    return(
        <Group
            justify="space-evenly"
            align="center"
            p="lg"
            h={rem(100)}
            >
            <Group>
                <IconMail size={40}/>
                <Title>RudeMailer</Title>
            </Group>
        </Group>
    )
}