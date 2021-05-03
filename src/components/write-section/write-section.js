import React from 'react';
import write from '../../assets/writing image.jpeg';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import './write-section.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const WriteSection = ({ user }) => {
    const currentUser = user === null
    return (
        <div className="write-container">
            <div className="section-image">
                <img alt="books" src={write} className="write-image" />
            </div>
            <div className="section-preview">
                <h1 className="title">Write Posts</h1>
                <p className="para">Writing is one of the good habits we can cultivate in ourselves <br/> from our childhood, Writing indeed helps us score well in academics.<br/> But the benefits of having good writing habit is not limited to institutional <br/> education and purpose of knowledge.<br/> Writing ensures our mental wellness, boosts our confidence  <br/> and enriches our knowledge. A News Post is beyond easy to <br/> write and read great looking articles. Add a little extra flair to your <br/> articles with hundreds of customizable vector icons, images and graphics <br/> overlays. One, who loves to write, is addicted to  <br/> writing because of the pleasure you will gets from it. <br/> Finally, a News Post website is powerful, fun, AND easy to use!</p>
                <Link to={currentUser ? "/signin" : "/writenews" }>
                    <CustomButton>Write Posts</CustomButton>
                </Link>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(WriteSection);