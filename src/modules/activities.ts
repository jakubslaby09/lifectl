const activities = {
    get all() {
        return JSON.parse(
            localStorage.getItem('activities') ?? '{}'
        ) as Activities
    },

    get empty() {
        return Object.getOwnPropertyNames(this.all).length == 0
    },

    get(name: string): Activity | undefined {
        return this.all[name]
    },

    _set(name: string, properties: Partial<Activity>) {
        localStorage.setItem('activities', JSON.stringify({
            ...this.all,
            [name]: {
                ...this.get(name) ?? {
                    created: new Date().valueOf(),
                    records: [],
                },
                ...properties,
            }
        }))
    },

    start(name: string) {
        const records = this.get(name)?.records; if(!records) return
        records[this._today(name)] = [
            ...records[this._today(name)] ?? [],
            {
                start: new Date().getTime(),
            }
        ]

        this._set(name, {
            records,
        })
    },

    finish(name: string) {
        const records = this.get(name)?.records; if(!records) return
        const lastrecord = records[this._today(name)]
        const lastrun = lastrecord[lastrecord.length - 1]
        
        lastrun.finish = new Date().valueOf()

        this._set(name, {
            records,
        })
    },

    remove(name: string) {
        localStorage.setItem('activities', JSON.stringify({
            ...this.all,
            [name]: undefined
        }))
    },

    lastAbsence(name: string) {
        const lastDay = this.get(name)!.records.length - 1
        return this._today(name) - lastDay > 0
            ? this._today(name) - lastDay : 0
    },

    _today(name: string) {
        return Math.floor(
            (new Date().valueOf() - this.get(name)!.created) / 86400000 /* seconds in a day */
        )
    },
};
(window as any).activities = activities

interface Activity {
    created: number,
    time: number,
    description: string,
    records: DayRecord[],
    goal: number
}

type DayRecord = {
    start: number,
    finish?: number
}[]

type Activities = {
    [name: string]: Activity
}