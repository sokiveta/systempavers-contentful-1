import React, {useState, useEffect, useCallback} from 'react'
import Marked from 'marked'
import { client } from '../../client'
import Loader from '../Loader/Loader'
import DOMPurify from 'dompurify'
// import { BLOCKS, MARKS } from '@contentful/rich-text-types';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const getHTMLData = (rawData) => {
  const htmlString =  rawData // marked(rawData)
  const sanitizedHTMLString = DOMPurify.sanitize(htmlString)
  // return htmlString
  return sanitizedHTMLString
}

const About = () => {
  const [about, setAbout] = useState({})
  const [isAboutLoading, setIsAboutLoading] = useState(false)

  const cleanUpAbout = useCallback((rawData) => {
      const {sys, fields} = rawData
      const {id} = sys
      const aboutTitle = fields.title
      const aboutImage = fields.image.fields.file.url
      const aboutContent = fields.content
      const aboutParagraph = getHTMLData(fields.paragraph)
      const aboutButton = fields.buttonText
      const aboutLink = fields.buttonLink
      const cleanAbout = { id, aboutTitle, aboutImage, aboutContent, aboutParagraph, aboutButton, aboutLink }

      setAbout(cleanAbout)
  }, [])

  const getAbout = useCallback(async () => {
    setIsAboutLoading(true)
    try {
      const response = await client.getEntry('7ovtGiqRDrUFVAthiV1QMt')
      if (response) {
        cleanUpAbout(response)
      } else {
        setAbout({})
      }
      setIsAboutLoading(false)
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpAbout])

  useEffect(() => {
    getAbout()
  }, [getAbout])

  if (isAboutLoading) {
    return <Loader />
  }

  const { aboutTitle, aboutImage, aboutContent, aboutParagraph, aboutButton, aboutLink } = about

  // 

  return (
    <section className='about' id='about'>
      <div className='row'>
        <div className='column'>
          <h2 className='titleText'>{aboutTitle}</h2>
          {/* <p>{aboutParagraph}</p> */}
          <div dangerouslySetInnerHTML={{ __html: aboutParagraph }} />
          <div><a href={aboutLink} className='btn'>{aboutButton}</a></div>
        </div>
        <div className='column'>          
          <div className='imgWrap'>
            <img className='imgAbout' src={aboutImage} alt={aboutTitle} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
