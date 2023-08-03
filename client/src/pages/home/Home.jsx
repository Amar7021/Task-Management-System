import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import image from "../../assets/note-cover-img.avif"
import { useNavigate } from "react-router-dom"
import "./home.scss"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="right">
          <img
            src={image}
            alt="cover-pic"
          />
        </div>
        <div className="left">
          <div className="top-left">
            <h1>Taskeeper</h1>
            <p>
              This Task Manager System app is a powerful and user-friendly
              application designed to help individuals to efficiently manage
              their tasks and daily activities. With its intuitive interface and
              robust features, the app enables users to organize, track, and
              prioritize tasks effectively, enhancing productivity and time
              management.
            </p>
          </div>
          <div className="welcome-box">
            <h2>What's on your mind, start for free!</h2>
            <div className="buttons">
              <button
                className="btn"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
              <button
                className="btn"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home
