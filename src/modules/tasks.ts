export class Activity {
    
    private created: number

    private static period = 60000

    constructor(
        public duration: number,
        public icon: string = '',
        private records: (Record | null)[] = [] 
    ) {
        this.created = new Date().valueOf()
    }

    get missing() {
        return this.nowIndex - this.records.length >= 0
            ? this.nowIndex - this.records.length : 0
    }
    
    get stats() { return {
        done: this.records.filter(r => r).length,
        rate: this.records.slice(-10).filter(r => r).length / this.records.slice(-10).length,
    }}

    get time() {
        if(!this.record) return null
        const time = (this.record?.finish ?? new Date().getTime()) - this.record.start
        return time / 1000
    }

    get timeleft() {
        if(!this.time) return null
        return this.duration - this.time
    }

    get record() {
        return this.records[this.records.length - 1] ?? null
    }

    start() {
        this.records[this.nowIndex] = {
            start: new Date().getTime()
        }
        
        return this.record
    }

    get nowIndex() {
        return Math.floor((new Date().valueOf() - this.created) / Activity.period)
    }

    finish() {
        if(!this.record) return
        if(this.record.finish) return
        this.record.finish = new Date().getTime()

        save()
    }
    
    cancel() {
        if(this.record) this.records[this.records.length - 1]!.finish = undefined
    }
}
(window as any).Activity = Activity

if(!localStorage.getItem('activities')) localStorage.setItem('activities', JSON.stringify({
    'testovací aktivita': new Activity(
        180,
        '',
        [{start:1638696955630,finish:1638696957596},null,{start:1638697127965,finish:1638697129239},null,null,null,{start:1638697435715,finish:1638697437630}]
    ),
    'další aktivita': new Activity(
        600,
    ),
} as Activities))

export const activities = {} as { [name: string]: Activity }
for(const name in JSON.parse(localStorage.getItem('activities')!)) {
    const activity = JSON.parse(localStorage.getItem('activities')!)[name]
    Object.setPrototypeOf(activity, Activity.prototype)
    activities[name] = activity
}
;(window as any).Alpine.store('activities', activities)
;(window as any).activities = activities

function save() {
    localStorage.setItem('activities', JSON.stringify(activities))
}

export type Activities = {
    [name: string]: Activity
}

export interface Record {
    start: number,
    finish?: number
}