import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { Location } from '../dashboard/ImageSlider';
import fullStar from '../../styles/images/full-star.svg';
import emptyStar from '../../styles/images/empty-star.svg';
import Rating from 'react-rating';
import ReviewForm from './ReviewForm';
import Review from './Review';

interface ReviewContainerProps {
  location: Location;
  reviews: any;
}

class ReviewContainer extends React.Component<ReviewContainerProps> {
  renderReviews = () => {
    return this.props.reviews.reviews.map(review => {
      return <Review review={review} />;
    });
  };

  render() {
    if (
      this.props.location &&
      this.props.reviews &&
      this.props.reviews.reviews
    ) {
      return (
        <div className="review-container">
          <h2 className="h2-big-b">Reviews</h2>
          <Rating
            emptySymbol={<img src={emptyStar} alt="star" />}
            fullSymbol={<img src={fullStar} alt="star" />}
            initialRating={
              Math.round(Number(this.props.location.rating) * 2) / 2
            }
            fractions={2}
            readonly
          />
          <p className="review-number">{this.props.reviews.amount} Reviews</p>
          <ReviewForm />
          {this.renderReviews()}
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    location: state.location.currentLocation,
    reviews: state.location.reviews
  };
};

export default connect(mapStateToProps)(ReviewContainer);
