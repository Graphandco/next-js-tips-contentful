import Link from 'next/link'
import Image from 'next/image'
import { ImEyePlus } from 'react-icons/im';

export default function TipCard({ tip }) {
   const {title, slug, tags} = tip.fields

   return (
      <div className='tip-card' >
         <div className="tags">
            {tags.map((tag, index) => (
               // <Image key={index}
               //    src={`/${tag}.png`}
               //    alt={tag}
               //    width={40}
               //    height={30}
               // />
               <div key={index} className={`tag tag-${tag.toLowerCase()}`}>{tag}</div>
            ))}
         </div>
         <h2>{title}</h2>
         <Link href={'/tips/' + slug}>        
            <a><ImEyePlus /></a>
         </Link>
      </div>
   )
}
