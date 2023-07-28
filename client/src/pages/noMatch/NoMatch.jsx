import { useNavigate } from "react-router-dom"
import "./noMatch.scss"

const NoMatch = () => {
  const navigate = useNavigate()

  return (
    <div className="noMatch">
      <div className="error-page">
        <h1>Error 404 - Page not found</h1>
        <p>Sorry, we can&apos;t find that page. Return to home page instead!</p>
        <button
          className="btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  )
}

export default NoMatch
