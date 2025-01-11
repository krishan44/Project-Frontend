import React, { useEffect } from 'react';
import './Home.css';
import Typed from 'typed.js';

function Home() {
  useEffect(() => {
    const typed = new Typed(".auto-type", {
      strings: ["Developer", "Doctor", "Engineer", "Teacher", "Chef", "Pilot"],
      typeSpeed: 100,
      backSpeed: 200,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <section id='Home'>
        <div className="container">
          <h1>Are you want to be an <span className="auto-type"></span></h1>
          <p>No Matter Who You Want To Be...</p>
          <h2>"Find the Path for your dream job."</h2>  
          <button className="button">Explore!!</button>
        </div>
      </section>
    </>
  );
}

export default Home;
