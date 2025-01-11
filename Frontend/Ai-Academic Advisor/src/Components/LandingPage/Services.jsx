import "./Services.css"
import Degree from "../../assets/services/degree.png";
import Skill from "../../assets/services/skill.png";
import Certificate from "../../assets/services/certificate.png";
import Demand from "../../assets/services/demand.png";


function Services() {
    return(
        <>
        <section id="services">
        <div className="serviceContainer">
            <h2>Top Features</h2>
            <div className="serviceContent">
                <div className="service-card">
                    <img src={Skill} alt="" />
                    <h3>Based on Skills</h3>
                    <p>Provides real-time insights into required skills for specific jobs</p>
                </div>
                <div className="service-card">
                <img src={Degree} alt="" />
                    <h3>Personalized Degree's</h3>
                    <p>Recommends relevant degrees for chosen careers</p>
                </div>
                <div className="service-card">
                    <img src={Certificate} alt="" />
                    <h3>Certificate Finding</h3>
                    <p>Highlights key certifications to boost employability</p>
                </div>
                <div className="service-card">
                    <img src={Demand} alt="" />
                    <h3>Future Demand</h3>
                    <p>Predicts future demand for various professions.</p>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}

export default Services;