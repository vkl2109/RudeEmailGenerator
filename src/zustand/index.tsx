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

export {
    useTimelineStore,
    useChosenTopicsStore
}