import "../styles/Welcome.css";

const Welcome = () => {
  return (
    <div>
      <div className="background-video ">
        <video muted autoPlay loop>
          <source
            src={process.env.PUBLIC_URL + "/videos/Smoke.mp4"}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="text">
        <p>Lorem Ipsum Dolor</p>
      </div>
    </div>
  );
};

export default Welcome;
