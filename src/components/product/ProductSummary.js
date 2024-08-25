import React, { useState }  from 'react';
import reviewsData from '../../data/reviewsData';
import useActive from '../../hooks/useActive';
import ProductReviews from './ProductReviews';
import { FaStar } from 'react-icons/fa';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim() !== '' && rating > 0) {
        const comment = {
          id: Date.now(),
          text: newComment,
          rating: rating,
          date: new Date().toLocaleDateString()
        };
        setComments([...comments, comment]);
        setNewComment('');
        setRating(0);
      }
    };
  
    return (
      <div className="comment-section">
        <h2>Comments</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar 
                    className="star" 
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={20}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Submit</button>
        </form>
  
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-rating">
                {[...Array(5)].map((star, index) => (
                  <FaStar 
                    key={index}
                    color={index < comment.rating ? "#ffc107" : "#e4e5e9"}
                    size={16}
                  />
                ))}
              </div>
              <p>{comment.text}</p>
              <small>{comment.date}</small>
            </div>
          ))}
        </div>
      </div>
    );
  };


const ProductSummary = (props) => {

    const { brand, title, info, category, type, connectivity } = props;

    const { active, handleActive, activeClass } = useActive('specs');


    return (
        <>
            <section id="product_summary" className="section">
                <div className="container">

                    {/*===== Product-Summary-Tabs =====*/}
                    <div className="prod_summary_tabs">
                        <ul className="tabs">
                            <li
                                className={`tabs_item ${activeClass('specs')}`}
                                onClick={() => handleActive('specs')}
                            >
                                Specifications
                            </li>
                            <li
                                className={`tabs_item ${activeClass('overview')}`}
                                onClick={() => handleActive('overview')}
                            >
                                Overview
                            </li>
                            <li
                                className={`tabs_item ${activeClass('reviews')}`}
                                onClick={() => handleActive('reviews')}
                            >
                                Reviews
                            </li>
                        </ul>
                    </div>

                    {/*===== Product-Summary-Details =====*/}
                    <div className="prod_summary_details">
                        {
                            active === 'specs' ? (
                                <div className="prod_specs">
                                    <ul>
                                        <li>
                                            <span>Brand</span>
                                            <span>{brand}</span>
                                        </li>
                                        <li>
                                            <span>Model</span>
                                            <span>{title}</span>
                                        </li>
                                        <li>
                                            <span>Generic Name</span>
                                            <span>{category}</span>
                                        </li>
                                        <li>
                                            <span>Headphone Type</span>
                                            <span>{type}</span>
                                        </li>
                                        <li>
                                            <span>Connectivity</span>
                                            <span>{connectivity}</span>
                                        </li>
                                        <li>
                                            <span>Microphone</span>
                                            <span>Yes</span>
                                        </li>
                                    </ul>
                                </div>
                            ) : active === 'overview' ? (
                                <div className="prod_overview">
                                    <h3>The <span>{title}</span> {info} provides with fabulous sound quality</h3>
                                    <ul>
                                        <li>Sound Tuned to Perfection</li>
                                        <li>Comfortable to Wear</li>
                                        <li>Long Hours Playback Time</li>
                                    </ul>
                                    <p>Buy the <b>{title} {info}</b> which offers you with fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these {category} giving you a truly awesome audio experience. It blends with exceptional sound quality and a range of smart features for an unrivalled listening experience.</p>
                                </div>
                            ) : (
                                <div className="prod_reviews">
                                    <ul>
                                        {
                                            reviewsData.map(item => (
                                                <ProductReviews
                                                    key={item.id}
                                                    {...item}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>
                            )


                        }
                        <CommentSection/>

                    </div>


                </div>
            </section>
        </>
    );
};

export default ProductSummary;