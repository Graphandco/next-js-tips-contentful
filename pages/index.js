import { createClient } from 'contentful'
import Prism from "Prismjs";
import {useState, useEffect} from 'react'
import TipCard from '../components/TipCard';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdCloseCircle } from 'react-icons/io';

export async function getStaticProps(){

   const client = createClient({
      space: process.env.CONTENTUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
      })
      const res = await client.getEntries({ content_type: 'tips' })
      return{
         props: {
         tips: res.items
      }
   }
}


export default function Tips( {tips} ) {
   useEffect(() => {
      Prism.highlightAll();
   }, []);

   const [allTips, setAllTips] = useState(tips);
   const [searchText, setSearchText] = useState('');
   const [radioValue, setRadioValue] = useState('');

   /*****************************
    SEARCHING TIPS
   *****************************/
   const handleSearch = (e)=> {
      setSearchText(e.target.value)
   }

   const clearSearch = () => {
      setSearchText('');
      Array.from(document.querySelectorAll("input")).forEach(
         input => (input.value = "")
       );
   }

   /*****************************
    FILTER TIPS
   *****************************/


   const filteredTips= allTips.filter((tip) => {
      return (
         tip.fields.title
         .toLowerCase()
         .includes(searchText.toLowerCase()) 
         &&
         tip.fields.language.includes(radioValue)
      );
   });

   const handleRadioValueChange = (event) => {
      setRadioValue(event.target.value);
      filteredTips.filter((filteredTip) => {
         return(
            filteredTip.fields.language.includes(radioValue)
         )
      })
  };

   console.log(filteredTips);
   return (
      <>

      <div className="search-tips">
         <div className="search-input">
            <BiSearchAlt />
            <input type="text" id="name" name="name" placeholder="Rechercher un tip..."size="20" onChange={handleSearch}> 
            </input>
            {searchText && <IoMdCloseCircle className='clear-search' onClick={clearSearch} />}  
         </div>
      </div>
         
         <div className='filter-tips'>
            <form onChange={handleRadioValueChange} id='search-form'>  
            <span>Filtrer: </span>              
                  <div className='filter-item'>
                     <input
                           type='radio'
                           id='tous'
                           name='filter-tips'
                           value=''
                     ></input>
                     <label htmlFor='tous' className='tag tag-all'>
                           Tous
                     </label>
                  </div>
                  <div className='filter-item'>
                     <input
                           type='radio'
                           id='css'
                           name='filter-tips'
                           value='CSS'
                     ></input>
                     <label htmlFor='css' className='tag tag-css'>
                           CSS
                     </label>
                  </div>
                  <div className='filter-item'>
                     <input
                           type='radio'
                           id='php'
                           name='filter-tips'
                           value='PHP'
                     ></input>
                     <label htmlFor='php' className='tag tag-php'>
                           PHP
                     </label>
                  </div>
                  <div className='filter-item'>
                     <input
                           type='radio'
                           id='prestashop'
                           name='filter-tips'
                           value='Prestashop'
                     ></input>
                     <label htmlFor='prestashop' className='tag tag-prestashop'>
                           Prestashop
                     </label>
                  </div>
                  <div className='filter-item'>
                     <input
                           type='radio'
                           id='javascript'
                           name='filter-tips'
                           value='Javascript'
                     ></input>
                     <label htmlFor='javascript' className='tag tag-javascript'>
                           Javascript
                     </label>
                  </div>
            </form>
            <div className="number">
               {filteredTips.length} 
               {filteredTips.length > 1 ? ' Tips ' : ' Tip '}
               {filteredTips.length > 1 ? ' trouvés ' : ' trouvé '}
            </div>
         </div>



         <div className='tips-list'>
            {filteredTips.map(tip => (
            <TipCard key={tip.sys.id} tip={tip}/>
            ))}
         </div>


         



      </>
   )
}


