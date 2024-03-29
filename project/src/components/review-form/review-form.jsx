import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../store/api-action';
import {commentSend} from '../../store/action';
import PropTypes from 'prop-types';
import {MIN_SYMBOLS_IN_REVIEW_FORM} from '../../const';
import {getIsCommentSendError, getIsCommentSending, getIsCommentSendSuccess} from '../../store/sent-data/selectors';
import './review-form.css';

function ReviewForm({id}) {

  const isCommentSendSuccess = useSelector(getIsCommentSendSuccess);
  const isCommentSendError = useSelector(getIsCommentSendError);
  const isCommentSending = useSelector(getIsCommentSending);

  const [comment, setComment] = useState({
    review: '',
    rating: 0,
  });

  const dispatch = useDispatch();

  const submitReview = (userComment, userRating, offerId) => {
    dispatch(sendMessage(userComment, userRating, offerId));
    dispatch(commentSend({userComment, userRating}));
  };

  const textAreaRef = useRef();

  const handlerSubmitFrom = (evt) => {
    evt.preventDefault();
    evt.target.reset();
    submitReview(comment.review, comment.rating, id);
  };

  useEffect(() => {
    textAreaRef.current.value = '';
    setComment(() => ({
      review: '',
      rating: 0,
    }));
  }, [isCommentSendSuccess]);

  const onChange = (evt) => {
    const {name, value} = evt.target;
    setComment((item) => ({...item, [name]: value}),
    );
  };

  return (
    <form onSubmit={handlerSubmitFrom} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div onChange={onChange} className="reviews__rating-form form__rating">
        {isCommentSendError ? <span className="reviews__error-message">Error message</span> : ''}
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          required
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        onChange={onChange}
        ref={textAreaRef}
        value={comment.review}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength="300"
        required
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isCommentSending || !(comment.review.length >= MIN_SYMBOLS_IN_REVIEW_FORM && comment.rating)}

        >Submit
        </button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ReviewForm;
