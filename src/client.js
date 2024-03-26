import * as contentful from 'contentful'


export const client = contentful.createClient ({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN  
})

// git@github.com:sokiveta/systempavers-contentful-1.git