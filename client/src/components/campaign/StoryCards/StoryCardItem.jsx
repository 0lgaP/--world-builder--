import React, {useState, useEffect} from 'react'

function StoryCardItem(props) {

  const getName = (id, objArr) => {
    const found = objArr.find(element => element.id === id)
    return found && found.name
  }

  const getLife = (id, objArr) => {
  const alive = objArr.find(element => element.id === id)
  return alive && alive.alive ? '😎' : '💀'
  }

  const npcName = getName(props.npcId, props.allNpcs)
  const mapName = getName(props.mapId, props.allMaps)
  const alive = getLife(props.npcId, props.allNpcs)

  const viewMode = props.view

  return (
    <section className="card">
        <article className="card__container">
          {viewMode !== 'SHOW' && <button 
          alt="Edit" className="button cancel" onClick={props.onEdit}>
            Edit
          </button>}
          <button alt="Toggle Alive" className="button death" onClick={props.onKill}>
          💀
          </button>
          <button alt="Story Card Completed" className="button confirm" onClick={props.onComplete}>
          ✅
          </button>
          {viewMode !== 'SHOW' && <button alt="Delete Story Card" className="button death" onClick={props.onDelete}>
          🗑️
          </button>}
            <div className="card__title">
            {props.text}
            </div>
            <div>
            {alive}{npcName}
            </div>
            <div>
            {mapName}
            </div>
        </article>
    </section>
  )
}

export default StoryCardItem