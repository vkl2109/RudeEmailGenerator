import { Group, rem, Title } from "@mantine/core";


export function RootHeader () {
    return(
        <Group
            justify="space-evenly"
            align="center"
            p="lg"
            h={rem(100)}
            >
            <Title>Rude Email Generator</Title>
        </Group>
    )
}