import React from 'react'

function StoryCardItemPull(props) {



  return (
    <section className="card">
      <form autoComplete="off">
        <article className="card__container">
          <button alt="Edit" className="button cancel">
            Edit
          </button>
          <button alt="Toggle Alive" className="button death" >
          💀
          </button>
          <button alt="Story Card Completed" className="button confirm">
          ✅
          </button>
          <button alt="Delete Story Card" className="button death" onClick={props.onDelete}>
          🗑️
          </button>
            <div className="card__title">
            {props.text}
            </div>
        </article>
      </form>
    </section>
  )
}

export default StoryCardItemPull