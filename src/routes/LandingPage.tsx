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
import { useMemo, useState } from "react";

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
        body: "If you're not satisfied, we'll rudely refund you"
    },
    {
        icon: IconFreeRights,
        title: 'No Cost',
        body: "It literally costs nothing."
    }
]


export function LandingPage () {

    const [ email, setEmail ] = useState('')

    const checkEmail = useMemo(() => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        return emailRegex.test(email);
    }, [email]);

    return(
        <Stack gap={0} w="100%">
            <Stack
                w="100%"
                bg="black"
                justify="center"
                align="center"
                p="xl"
                m={0}
                mih={rem(300)}
                >
                <Title
                    c="white"
                    ta="center"
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
                    component="a"
                    href="/rude"
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
                            maw='90%'
                            radius="xl"
                            >
                            <Stack 
                                justify="center"
                                align="center"
                                ta="center"
                                p="xl"
                                >
                                <item.icon style={{
                                    height: 25,
                                    width: 25
                                }}/>
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
                w="100%"
                ta="center"
                >
                <Title>Unleash Your Inner Keyboard Warrior</Title>
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
                    maw="90%"
                    placeholder="enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                <Button
                    variant="light"
                    size="xl"
                    w={rem(400)}
                    maw="90%"
                    disabled={!checkEmail}
                    >
                    Sign Up for Rudeness
                </Button>
                <Text
                    size="sm"
                    fw="lighter"
                    ta="center"
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
                    ta="center"
                    >
                    © 2023 RudeMailer Inc. All rights reserved. Be nice to each other IRL.
                </Text>
            </Group>
        </Stack>
    )
}