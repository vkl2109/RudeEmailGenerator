import { 
    Button,
    Card,
    Divider,
    Group,
    rem,
    Stack, 
    Text, 
    TextInput, 
    Title
} from "@mantine/core";
import { IconBolt, IconFreeRights, IconMoodSmile, IconShield } from "@tabler/icons-react";
import { useState } from "react";

const icons = [
    {
        icon: IconBolt,
        title: 'Lightning Fast',
        body: 'Generate rude emails in seconds. Time is money, after all.'
    },
    {
        icon: IconShield,
        title: 'Plausible Deniability',
        body: 'Blame it on the algorithm if things go south',
    }, 
    {
        icon: IconMoodSmile,
        title: 'Satisfaction Guaranteed',
        body: "If you're not rudely satisfied, we'll rudely refund you"
    },
    {
        icon: IconFreeRights,
        title: 'No Cost',
        body: "It literally costs nothing."
    }
]


export function LandingPage () {

    const [ email, setEmail ] = useState('')

    return(
        <Stack gap={0}>
            <Stack
                w="100%"
                bg="black"
                justify="center"
                align="center"
                p="xl"
                h={rem(300)}
                m={0}
                >
                <Title
                    c="white"
                    >
                    Generate Rudely Effective Emails
                </Title>
                <Text
                    c="gray"
                    ta="center"
                    maw={rem(600)}
                    size="lg"
                    >
                    Tired of being polite? Let RudeMailer craft the perfect snarky response for you. Because sometimes, nice just doesn't cut it.
                </Text>
                <Button
                    size="md"
                    >
                    Get Rude Now
                </Button>
            </Stack>
            <Group
                justify="center"
                align="center"
                p="xl"
                bg="rgb(249 250 251)"
                m={0}
                >
                {icons.map((item, i) => {
                    return(
                        <Card 
                            key={i}
                            shadow="md"
                            w={rem(400)}
                            h={rem(250)}
                            radius="xl"
                            >
                            <Stack 
                                justify="center"
                                align="center"
                                ta="center"
                                p="xl"
                                >
                                <item.icon size={50}/>
                                <Title order={3}>{item.title}</Title>
                                <Text>{item.body}</Text>
                            </Stack>
                        </Card>
                    )
                })}
            </Group>
            <Divider m={0}/>
            <Stack
                justify="center"
                align="center"
                p="xl"
                >
                <Title>Ready to Unleash Your Inner Keyboard Warrior?</Title>
                <Text
                    c="gray"
                    ta="center"
                    maw={rem(600)}
                    size="lg"
                    >
                    Sign up now and start sending emails that would make your grandmother blush.
                </Text>
                <TextInput
                    size="xl"
                    w={rem(400)}
                    placeholder="enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                <Button
                    variant="light"
                    size="xl"
                    w={rem(400)}
                    >
                    Sign Up for Rudeness
                </Button>
                <Text
                    size="sm"
                    fw="lighter"
                    >
                    Don't worry, we won't email you. Unless you ask nicely.
                </Text>
            </Stack>
            <Divider />
            <Group
                justify="center"
                align="center"
                p="md"
                bg="rgb(249 250 251)"
                >
                <Text
                    fw="lighter"
                    >
                    © 2023 RudeMailer Inc. All rights reserved. Be nice to each other IRL.
                </Text>
            </Group>
        </Stack>
    )
}