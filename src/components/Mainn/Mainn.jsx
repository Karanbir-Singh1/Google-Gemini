import React, { useContext } from 'react'
import './Mainn.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context'
const Mainn= () => {

  const{onSent,recentPrompts,showResults,loading,resultData,input,setInput}=  useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResults
          ?<>
          <div className="greet">
            <p> <span>Hello, karan</span> </p>
            <p>How can I help you</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Suggest places to visit</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>breifly summary this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div><div className="card">
              <p>braindtorming team activities</p>
              <img src={assets.message_icon} alt="" />
            </div><div className="card">
              <p>improvethe following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
          
          </>: <div  className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p> {recentPrompts}</p>
            
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
            ?<div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          
           : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            }
          </div>
          </div>
          }
          
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter prompt here' />
              <div> 
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input?<img onClick ={()=>onSent(input)} src={assets.send_icon} alt="" />:null}

              </div>
            </div>
            <p className="bottom-info">Gemini can make mistakes. Consider checking important information.</p>
          </div>
        </div>
    </div>
  )
}

export default Mainn
