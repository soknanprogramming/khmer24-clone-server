import 'dotenv/config'
import express from 'express'
import path from 'path';

import productCategoryRouter from './routes/productCategoryRoute'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Tony :)')
})


// Make the imageupload folder publicly accessible
// const test = path.join(process.cwd(), 'uploads')
// Make uploads folder accessible for serving static files
// Change this line
app.use('/uploads', express.static(path.join('src', 'uploads')))

app.use("/api/productCategory", productCategoryRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`)
})