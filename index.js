const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const database_id = process.env.NOTION_DATABASE_ID

const getVideos = async () => {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST'
  }
  const {results} = await notion.request(payload)

  const videos = results.map(page => {
    console.log(page.properties.Description.rich_text[0].text.content)

    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content
    }
  })

  return videos
}

(async () => {
  const nVideos = await getVideos()
  console.log(nVideos)
})()