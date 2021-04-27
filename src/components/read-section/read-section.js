import React from 'react';
import read from '../../assets/reading image.png';
import CustomButton from '../custom-button/custom-button';
import './read-section.scss';

const ReadSection = () => (
    <div className="section-container">
        <div className="section-preview">
            <h1 className="title">Read Posts</h1>
            <p className="para">To put it simply, BeFunky makes photo editing easy. With our <br/> world famous Photo Editor, you can turn photos you like into <br/> photos you love! From essential editing tools such as crop, <br/> resize, and exposure to our more unique effects like <br/> Cartoonizer, Digital Art, and Enhance DLX, it's beyond easy to <br/> create great looking photos. Add a little extra flair to your <br/> image with hundreds of customizable vector icons and graphic <br/> overlays. If picture quotes are your thing, BeFunky's Photo <br/> Editor has hundreds of free fonts for you to choose from. <br/> Finally, a photo editor that's powerful, fun, AND easy to use!</p>
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