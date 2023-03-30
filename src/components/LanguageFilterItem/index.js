// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeLanguageId, isActive} = props
  const {id, language} = languageDetails

  const onClickLanguage = () => {
    activeLanguageId(id)
  }

  const className = isActive ? 'border' : ''

  return (
    <li className="list-container">
      <button
        onClick={onClickLanguage}
        className={`button ${className}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
