/* if(!localStorage.getItem('intents')) */ localStorage.setItem('intents', JSON.stringify({
    'Testovací rutina': {
        history: [],
        tasks: [
            '1. Krok',
            'testovací aktivita',
            '3. Krok',
            '4. Krok',
        ]
    },
    'Další rutina': {
        history: [],
        tasks: []
    },
} as Intents))
export const intents = JSON.parse(localStorage.getItem('intents')!) as Intents;
(window as any).Alpine.store('intents', intents)

export interface Intent {
    history: Date[]
}

export interface Routine extends Intent {
    tasks: string[]
}

export interface Quota {
    badActivity: string
}

export type Intents = {
    [name: string]: Intent
}