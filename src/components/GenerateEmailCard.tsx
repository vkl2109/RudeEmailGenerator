import { 
    Button,
    Card, 
    rem, 
    Stack,
    TextInput,
    Title
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useTimelineStore } from "../zustand";


export function GenerateEmailCard () {

    const updateTimeline = useTimelineStore((state) => state.updateTimeline)

    const form = useForm({
        initialValues: {
            to: '',
            from: ''
        },

        validate: {
            to: isNotEmpty('add recipient'),
            from: isNotEmpty('add author')
        }
    })

    const handleSubmit = async (values: { to: string; from: string; }) => {
        try {
            console.log(values)
            updateTimeline(2)
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Please Try Again'
            })
        }
    }

    return(
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Card
                radius="xl"
                shadow="md"
                p="xl"
                h={rem(300)}
                w={rem(250)}
                >
                    <Stack
                        justify="center"
                        align="center"
                        w="100%"
                        h="100%"
                        >
                        <Title order={4}>Who's this for?</Title>
                        <TextInput
                            placeholder="to"
                            size="md"
                            {...form.getInputProps('to')}
                            />
                        <TextInput
                            placeholder="from"
                            size="md"
                            {...form.getInputProps('from')}
                            />
                        <Button
                            fullWidth
                            variant="light"
                            type="submit"
                            size="md"
                            >
                            Generate
                        </Button>
                    </Stack>
            </Card>
        </form>
    )
}