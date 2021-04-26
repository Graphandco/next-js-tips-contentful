import { createClient } from 'contentful'
import Link from 'next/link'
import Prism from "Prismjs";
import {useEffect} from 'react'
import { BsChevronDoubleLeft } from 'react-icons/bs';

const client = createClient({
  space: process.env.CONTENTUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'tips'
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }){
  const { items }= await client.getEntries({
    content_type: 'tips',
    'fields.slug': params.slug
  })

  return {
    props: { tips: items[0]}
  }

}

export default function TipsDetails({ tips }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const{title, description, language, code} = tips.fields

  console.log(tips);
  return (
    <div className="single-tip">
      <Link href={'/'}>        
        <a className='back'><BsChevronDoubleLeft />Retour à la liste</a>
      </Link>
      <h2>{title}</h2>
      <p>{description}</p>
      <pre>
        <code className={language === 'PHP' ? 'language-javascript' : 'language-' + (language).toLowerCase()}>
        {code}
        </code>
      </pre>
    </div>
  )
}