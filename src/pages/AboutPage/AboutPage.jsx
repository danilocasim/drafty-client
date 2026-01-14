import style from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div className={style.wrapper}>
      <p>
        This is Dan, a curious dev who wants to change the world using his
        keyboard
      </p>
      <p>
        You can connect with him at{" "}
        <a href='https://www.linkedin.com/in/danilo-casim-jr09/'>LinkedIn</a>
      </p>
    </div>
  );
}

export default AboutPage;
