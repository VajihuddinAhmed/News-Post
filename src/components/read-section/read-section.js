import React from 'react';
import read from '../../assets/reading image.png';
import CustomButton from '../custom-button/custom-button';
import './read-section.scss';

const ReadSection = () => (
    <div className="section-container">
        <div className="section-preview">
            <h1 className="title">Read Posts</h1>
            <p className="para">Reading is one of the good habits we can cultivate in ourselves <br/> from our childhood, Reading indeed helps us score well in academics.<br/> But the benefits of having good reading habit is not limited to institutional <br/> education and purpose of knowledge.<br/> Reading ensures our mental wellness, boosts our confidence  <br/> and enriches our knowledge. A News Post is beyond easy to <br/> write and read great looking articles. Add a little extra flair to your <br/> articles with hundreds of customizable vector icons and graphic <br/> overlays. One, who loves to read, is addicted to  <br/> reading because of the pleasure you will gets from it. <br/> Finally, a News Post website is powerful, fun, AND easy to use!</p>
            <a href="#read-posts">
                <CustomButton>Read Posts</CustomButton>
            </a>
        </div>
        <div className="section-image">
            <img alt="books" src={read} className="read-image" />
        </div>
    </div>
);

export default ReadSection;