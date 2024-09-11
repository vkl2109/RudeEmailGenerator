import { create } from 'zustand'

interface TimelineState {
    timeline: number,
    updateTimeline: (newTimeline: number) => void
}

const useTimelineStore = create<TimelineState>((set) => ({
    timeline: 0,
    updateTimeline: (newTimeline: number) => set(() => ({
        timeline: newTimeline
    }))
}))

interface ChosenTopicsState {
    chosenTopics: string[],
    updateChosenTopics: (newChosenTopics: string[]) => void
}

const useChosenTopicsStore = create<ChosenTopicsState>((set) => ({
    chosenTopics: [],
    updateChosenTopics: (newChosenTopics: string[]) => set(() => ({
        chosenTopics: newChosenTopics
    }))
}))

interface emailTemplateState {
    to: string,
    from: string,
    body: string,
    updateTemplate: (newTemplate: {to: string; body: string; from: string}) => void
}

const useEmailTemplateStore = create<emailTemplateState>((set) => ({
    to: '',
    body: '',
    from: '',
    updateTemplate: (newTemplate: {to: string; body: string; from: string}) => set(() => ({
        to: newTemplate?.to,
        body: newTemplate?.body,
        from: newTemplate?.from
    }))
}))


export {
    useTimelineStore,
    useChosenTopicsStore,
    useEmailTemplateStore
}