#!/usr/bin/env node

import App from '@/app'
import RouteLists from '@/routes'

const app = new App(Object.values(RouteLists))

app.listen()
