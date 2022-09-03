interface Routine {
    /* name: string */
    description: string
    tasks: string[]
}

Object.defineProperty(window, 'routines', {
    get: () => JSON.parse(
        localStorage.getItem('routines') ?? '{}'
    ) as Routine[]
})