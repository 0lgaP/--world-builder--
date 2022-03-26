import React from 'react'

function StoryCardItem(props) {

  return (
    <section className="card">
      {/* <form autoComplete="off"> */}
        <article className="card__container">
          {/* <button className="button order">
            {props.order}
          </button> */}
          {!props.view === 'SHOW' && <button alt="Edit" className="button cancel" onClick={props.onEdit}>
            Edit
          </button>}
          <button alt="Toggle Alive" className="button death" >
          💀
          </button>
          <button alt="Story Card Completed" className="button confirm" onClick={props.onComplete}>
          ✅
          </button>
          {!props.view === 'SHOW' && <button alt="Delete Story Card" className="button death" onClick={props.onDelete}>
          🗑️
          </button>}
            <div className="card__title">
            {props.text}
            </div>
        </article>
      {/* </form> */}
    </section>
  )
}

export default StoryCardItem