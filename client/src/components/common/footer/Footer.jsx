import "./footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyrights">
        <p>Copyright &copy; {new Date().getFullYear()} Taskeeper</p>
      </div>
      <div className="socials">
        <span>
          <a
            href="https://github.com/Amar7021"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </span>
        <span>
          <i className="fa-brands fa-linkedin"></i>
        </span>
        <span>
          <i className="fa-brands fa-youtube"></i>
        </span>
      </div>
    </footer>
  )
}

export default Footer
