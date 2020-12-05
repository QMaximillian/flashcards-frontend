import { build, fake } from 'test-data-bot'

const buildUser = build("User").fields({
            username: fake(f => f.internet.userName()),
            password: fake(f => f.internet.password()),
            email: fake(f => f.internet.email().toLowerCase()),
            first_name: fake(f => f.name.firstName()),
            last_name: fake(f => f.name.lastName())
        })

const buildCardSetName = build("User").fields({
    cardSetName: fake(f => `${f.random.uuid()}-${f.random.word()}`)
})

const buildNewFlashcard = build("User").fields({
    term: fake(f => f.lorem.words()),
    definition: fake(f => f.lorem.sentence())
})

export { buildUser, buildCardSetName, buildNewFlashcard }