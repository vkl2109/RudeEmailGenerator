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
import { useChosenTopicsStore, useEmailTemplateStore, useTimelineStore } from "../zustand";
import { functions } from "../../firebase";
import { httpsCallable } from "@firebase/functions";
import { useState } from "react";

export function GenerateEmailCard () {

    const updateTimeline = useTimelineStore((state) => state.updateTimeline)
    const updateTemplate = useEmailTemplateStore((state) => state.updateTemplate)
    const chosenTopics = useChosenTopicsStore((state) => state.chosenTopics)

    const [ loadingEmail, setLoadingEmail ] = useState(false)

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

    interface emailData {
        success: boolean;
        newEmail: {
            body: string
        }
    }

    const handleSubmit = async (values: { to: string; from: string; }) => {
        try {
            console.log(values)
            setLoadingEmail(true)
            const generateEmail = httpsCallable(functions, 'generateEmail')
            const emailResult = await generateEmail({
                topics: chosenTopics
            })
            const newEmail = emailResult?.data as emailData
            console.log(newEmail)
            if (!newEmail.success) throw new Error ('failed to generate email')
            updateTemplate({
                to: values.to,
                body: newEmail.newEmail.body,
                from: values.from
            })
            updateTimeline(2)
            form.reset()
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Please Try Again'
            })
        } finally {
            setLoadingEmail(false)
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
                            loading={loadingEmail}
                            >
                            Generate
                        </Button>
                    </Stack>
            </Card>
        </form>
    )
}