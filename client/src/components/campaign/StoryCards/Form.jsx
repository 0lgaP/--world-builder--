import React, { useState, useContext, useEffect } from "react";
import DropDownListMap from "./DropDownListMap";
import DropDownListNpc from "./DropDownListNpc";
import './Button.css';
import './Form.css';
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import DropDownListItem from "./DropDownListItem";

function Form({allStories, setStories, text, id, npc, map, view, setView, viewObj, css, dndStory, setDndStory, setCurrentStory}) {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id
  const c_id = campaign()

  const address = `/users/${u_id}/campaigns/${c_id}/story`
  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: text,
    completed: false
  })


  useEffect(()=>{
    setStoryText(text)
  },[text])

  const setNpc = (e) => {
    const selectedNpc = e.target.value;

    setStory({...story, npc_id: selectedNpc})
  }


  const setMap = (e) => {
    const selectedMap = e.target.value;

    setStory({...story, map_id: selectedMap})
  }


  const setStoryText = (newStory) => {
    setStory({...story, text: newStory})
  }


  const reset = (e) =>{
    e.preventDefault()
    setStory({...story, map_id: '', npc_id: '', text: ''})
    setCurrentStory({})
    if(view === viewObj.EDIT){
      setView(viewObj.CREATE)
    }
  }


  const createStory = (event) => {
    event.preventDefault()

      axios.post(`${address}`, story)
      .then((res) => {

        const card = res.data
        setStories(prev => {
          const newState = {...prev}
          return {...newState, [card.id]: {...card}}
        })
        setStory(prev => {
          return {...prev, map_id: '', npc_id: '', text: ''}
        })
        setDndStory(prev => {
          const newState = [...prev];
          newState.push(card)
          return newState
        })
        if(view === viewObj.EDIT){
          setView(viewObj.CREATE)
        }
      })
      .catch((err) => console.log("Error From FORM's POST Client Call", err))
  }

  const editStory = (event) => {
  event.preventDefault()

  if(story.map_id === ''){
    story.map_id = map
  }
  if(story.npc_id === ''){
    story.npc_id = npc
  }

  axios.put(`${address}/${id}`, story)
  .then((res) => {
    const card = res.data
    setCurrentStory({})
    setStories(prev => {
      const newState = {...prev}
      return {...newState, [card.id]: {...card}}
    })
    setStory(prev => {
      return {...prev, map_id: '', npc_id: '', text: ''}
    })
    setDndStory(prev => {
      const newState = [...prev];

      for (const index in newState) {

        if (newState[index].id !== card.id) continue;
        newState[index] = card;

        break;
      }
      
      return newState
    })
    if(view === viewObj.EDIT){
      setView(viewObj.CREATE)
    }
  })
  .catch((err) => console.log("Error From FORM's EDIT Client Call"))
}

  return (
  <section className={[`form `]}>
    <form autoComplete="off">
      <article className={[`form__container ${css}`]}>
        <label className="form__title">
          {id ? "Update Story" : "Add Story Card"}
        </label>
        < textarea 
        className="form__text-area"
        value={story.text}
        onChange={(e) => setStoryText(e.target.value)}
        />
      <article className="form__dropdown_container">
        <DropDownListMap onChange={setMap} value={map}/>
        <DropDownListNpc onChange={setNpc} value={npc}/>
      </article>
        <button className="button confirm" type="submit" onClick={id ? editStory : createStory}>
          Submit
        </button>
        <button className="button cancel" onClick={reset} >
          Reset
        </button>
      </article>
    </form>
  </section>

  )
}

export default Form