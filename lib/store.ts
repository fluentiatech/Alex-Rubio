import { create } from 'zustand'
import { Team, DEFAULT_TEAM } from './teams'

interface TeamStore {
  activeTeam: Team
  setActiveTeam: (team: Team) => void
}

export const useTeamStore = create<TeamStore>((set) => ({
  activeTeam: DEFAULT_TEAM,
  setActiveTeam: (team) => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--accent', team.accent)
    }
    set({ activeTeam: team })
  },
}))
