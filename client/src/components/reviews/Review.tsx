import React from 'react';

interface ReviewProps {
  review: any;
}

class Review extends React.Component<ReviewProps> {
  render() {
    const { review } = this.props;

    return (
      <div style={{ marginBottom: '2em', borderBottom: '1px #95b0b2 solid' }}>
        <div>
          <h3 style={{ display: 'inline' }}>
            {review.user.firstName} {review.user.lastName}
          </h3>
          <p style={{ color: '#95b0b2', marginLeft: '1em', display: 'inline' }}>
            On {new Date(review.dateCreated).toLocaleDateString()}
          </p>
        </div>
        <p>{review.content}</p>
      </div>
    );
  }
}

export default Review;
