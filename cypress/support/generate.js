import { build, fake } from 'test-data-bot'

const buildUser = build("User").fields({
            username: fake(f => f.internet.userName()),
            password: fake(f => f.internet.password()),
            email: fake(f => f.internet.email()),
            first_name: fake(f => f.name.firstName()),
            last_name: fake(f => f.name.lastName())
        })

export { buildUser }