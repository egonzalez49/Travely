import React from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { addReview } from '../../actions';
import fullStar from '../../styles/images/full-star.svg';
import emptyStar from '../../styles/images/empty-star.svg';
import { StoreState } from '../../reducers';

interface ReviewFormProps {
  currentLocation: any;
  addReview: Function;
}

class ReviewForm extends React.Component<ReviewFormProps> {
  state = {
    content: '',
    rating: 0,
    error: false
  };

  onSubmit = () => {
    if (!this.state.content) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const response = {
        rating: this.state.rating,
        content: this.state.content,
        location: this.props.currentLocation._id
      };
      this.props.addReview(response);
      this.setState({ content: '', rating: 0, error: false });
      alert('Successfully added review.');
    }
  };

  render() {
    return (
      <div className="review-form">
        <p className="leave-review">Leave a Review</p>
        <div className="flex-review">
          <div className="textarea-div">
            <textarea
              className={
                this.state.error
                  ? 'rating-error rating-textarea'
                  : 'rating-textarea'
              }
              onChange={e => {
                this.setState({ content: e.target.value });
              }}
              value={this.state.content}
              placeholder="I had an amazing time here! Totally recommend for a family vacation!"
            />
            {this.state.error ? (
              <p className="form-error">Review must not be empty.</p>
            ) : null}
          </div>
          <div>
            <div>
              <Rating
                emptySymbol={<img src={emptyStar} alt="star" />}
                fullSymbol={<img src={fullStar} alt="star" />}
                fractions={2}
                initialRating={this.state.rating}
                onChange={rate => this.setState({ rating: rate })}
              />
            </div>
            <button onClick={this.onSubmit} className="button">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    currentLocation: state.location.currentLocation
  };
};

export default connect(
  mapStateToProps,
  { addReview }
)(ReviewForm);
