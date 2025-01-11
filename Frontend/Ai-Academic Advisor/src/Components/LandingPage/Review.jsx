import React, { useState } from "react";
import "./Review.css";
import PersonOne from "../../assets/Reviews/person_One.png";
import PersonTwo from "../../assets/Reviews/person_Two.png";
import PersonThree from "../../assets/Reviews/person_Three.png";
import PersonFour from "../../assets/Reviews/person_Four.png";
import StarRating from "../../assets/Reviews/markedStar.png";
import StarRatingUnmark from "../../assets/Reviews/unmarkedStar.png"; 

const reviews = [
    {
        image: PersonOne,
        text: "This platform helped me navigate my career path in education. I was able to get personalized recommendations that matched my interests and skills. It made the entire decision-making process much clearer and easier. Highly recommended for anyone uncertain about their academic future!",
        name: "Ayesha Ali",
        star: 5
    },
    {
        image: PersonTwo,
        text: "I was looking for guidance on choosing a postgraduate program, and this tool provided me with valuable insights. It suggested programs based on my academic background and career goals. The recommendations were spot on. Definitely a great resource for anyone looking to advance their education.",
        name: "John Smith",
        star: 4
    },
    {
        image: PersonThree,
        text: "The Education Advisor app is fantastic! I found it super helpful when choosing between different career paths in education. The system takes your preferences into account and provides tailored suggestions that make sense. It's easy to use and incredibly accurate!",
        name: "Maria Lopez",
        star: 5
    },
    {
        image: PersonFour,
        text: "I used the platform to explore different career options in education, and I must say, it exceeded my expectations. The recommendations were aligned with my aspirations, and it helped me make informed decisions. The user interface is also intuitive and friendly.",
        name: "Raj Kumar",
        star: 4
    }
];


function Review() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };

    const renderStars = (starCount) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            const starImage = i < starCount ? StarRating : StarRatingUnmark; 
            stars.push(
                <img 
                    key={i} 
                    src={starImage} 
                    alt="star" 
                    className="star" 
                />
            );
        }
        return stars;
    };

    return (
        <>
        <section id="Review">
        <div className="ReviewContainer">
            <h2>Reviews</h2>
            <div className="contentReview">
                <img src={reviews[currentIndex].image} alt="Review" />
                <h3>{reviews[currentIndex].name}</h3>
                <p>{reviews[currentIndex].text}</p>
                <div className="starRating">
                    {renderStars(reviews[currentIndex].star)} 
                </div>
            </div>
            <div className="arrows">
                <button onClick={handlePrevClick}>&lt;</button>
                <button onClick={handleNextClick}>&gt;</button>
            </div>
        </div>
        </section>
        </>
    );
}

export default Review;
