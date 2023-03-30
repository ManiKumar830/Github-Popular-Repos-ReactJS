import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const activeStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'IS_LOADING',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    languageList: [],
    activeLanguage: activeStatus.initial,
  }

  componentDidMount() {
    this.getLanguageDetails()
  }

  getLanguageDetails = async () => {
    const {activeId} = this.state

    this.setState({activeLanguage: activeStatus.isLoading})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )

    if (response.ok) {
      const data = await response.json()

      const newList = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languageList: newList,
        activeLanguage: activeStatus.success,
      })
    } else {
      this.setState({activeLanguage: activeStatus.failure})
    }
  }

  activeLanguageId = id => {
    this.setState({activeId: id}, this.getLanguageDetails)
  }

  renderLanguagesButtons = () => {
    const {activeId} = this.state
    return (
      <ul className="ul-language-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            isActive={activeId === eachItem.id}
            activeLanguageId={this.activeLanguageId}
            key={eachItem.id}
            languageDetails={eachItem}
          />
        ))}
      </ul>
    )
  }

  filterItems = () => {
    const {languageList} = this.state
    return (
      <ul className="repo-ul-container">
        {languageList.map(eachItem => (
          <RepositoryItem key={eachItem.id} repositoryDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepo = () => {
    const {activeLanguage} = this.state

    switch (activeLanguage) {
      case activeStatus.success:
        return this.filterItems()
      case activeStatus.failure:
        return this.renderFailure()
      case activeStatus.isLoading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>

        {this.renderLanguagesButtons()}

        {this.renderRepo()}
      </div>
    )
  }
}

export default GithubPopularRepos
