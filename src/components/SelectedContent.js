import React from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { useSelector } from 'react-redux';

export const SelectedContent = () => {

  const { active:article } = useSelector(state => state.articles)
  console.log(article);

  const articleContent = article.article.content
  // const articleContentJoined = articleContent.join( "\n" )

  return (
    <div selected__main-container>
      <div className="selected-content">
        <div className="like-btn-container">
          <button className="like-btn"><FcLikePlaceholder className="like like-placeholder" /></button>
          <FcLike />
        </div>
        <div>
          <div className="article-body">
            <h1>{ article.article.name }</h1>
            {
              article.article.content.length >= 1
                ? <div>
                    <p> {articleContent[0].split(" ").slice(2).join(" ")} </p><br/>
                    <p> {articleContent[1]} </p><br/>
                    <p> {articleContent[2]} </p><br/>
                    <p> {articleContent[3]} </p><br/>
                    <p> {articleContent[4]} </p><br/>
                  </div>
                : <p>{ articleContent.split(" ").slice(2).join(" ") }</p>
            }

          </div>
          <div className="reference article-reference1">
            {
              article.headline.title
                ? <p>Este artículo es del { article.headline.title }: { article.headline.name } </p>
                : ''
            }
          </div>
          <div className="reference article-reference2">
            {
              
              article.chapter.title === "null"
                ? ''
                :  <p>- { article.chapter.title }: { article.chapter.name } </p>
            }
          </div>
        </div>
      </div>
      <div className="back-btn">
        <h4>Regresar</h4>
      </div>
    </div>
  )
}


