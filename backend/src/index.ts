import express from 'express'
import cors from 'cors'

import { router } from './routes'

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('lorem ipsum dolor sit amet!'))
app.use('/api', router)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))