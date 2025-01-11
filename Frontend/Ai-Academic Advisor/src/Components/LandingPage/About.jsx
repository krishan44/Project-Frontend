import "./About.css"


function About() {
  return (
    <>
    <section id="about">
    <div className="aboutContainer">
      <h2>About Us</h2>
      <div className="aboutContent">
        <h3>"Let Us Handle the Complexity <br /> 
        <span className="h3-lower">While You Focus on Your <span>Goals</span>"</span> </h3>
        <p>"This project is the culmination of our BEng in Software Engineering program. 
          Through this initiative, we aim to provide essential guidance to individuals who lack a 
          clear understanding of their future career paths. By simplifying decision-making processes, we aspire to empower users with the knowledge and tools <br />
          <span className="learnMore"><a href="#">Learn More</a></span>   
        </p>  
      </div>
    </div>
    </section>
    </>
  );
}

export default About;