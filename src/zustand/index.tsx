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

export {
    useTimelineStore
}