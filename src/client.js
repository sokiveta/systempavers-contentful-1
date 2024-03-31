import * as contentful from 'contentful'

export const client = contentful.createClient ({
  space: 'hy62vhjbcrx4',
  accessToken: 'eCaXhWwg8JXP9Ng7veAXQFGODCw1ilXVDGPyABfEKaY' 
})

// export const client = contentful.createClient ({
//   space: process.env.REACT_APP_SPACE_ID,
//   accessToken: process.env.REACT_APP_ACCESS_TOKEN  
// })
