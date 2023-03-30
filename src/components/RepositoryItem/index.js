// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    id,
    issuesCount,
    name,
    starsCount,
  } = repositoryDetails

  return (
    <li className="repo-container">
      <img className="avatar-image" alt={name} src={avatarUrl} />
      <h1 className="repo-heading">{name}</h1>
      <div className="inner-container">
        <div className="repo-text-container">
          <img
            className="star-image"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          <p className="stars-text">{starsCount} stars</p>
        </div>

        <div className="repo-text-container">
          <img
            className="star-image"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          <p className="stars-text">{forksCount} forks</p>
        </div>

        <div className="repo-text-container">
          <img
            className="star-image"
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          <p className="stars-text">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
