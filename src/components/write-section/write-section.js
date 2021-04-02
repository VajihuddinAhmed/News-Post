import React from 'react';
import write from '../../assets/writing image.jpeg';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import './write-section.scss';

const WriteSection = () => (
    <div className="write-container">
        <div className="section-image">
            <img alt="books" src={write} style={{width: '500px', height: '420px'}} />
        </div>
        <div className="section-preview">
            <h1 className="title">Write Posts</h1>
            <p className="para">To put it simply, BeFunky makes photo editing easy. With our <br/> world famous Photo Editor, you can turn photos you like into <br/> photos you love! From essential editing tools such as crop, <br/> resize, and exposure to our more unique effects like <br/> Cartoonizer, Digital Art, and Enhance DLX, it's beyond easy to <br/> create great looking photos. Add a little extra flair to your <br/> image with hundreds of customizable vector icons and graphic <br/> overlays. If picture quotes are your thing, BeFunky's Photo <br/> Editor has hundreds of free fonts for you to choose from. <br/> Finally, a photo editor that's powerful, fun, AND easy to use!</p>
            <Link to="/signin">
                <CustomButton>Write Posts</CustomButton>
            </Link>
        </div>
    </div>
);

export default WriteSection;