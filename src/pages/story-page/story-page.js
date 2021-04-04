import React from 'react';
import './story-page.scss';
import newspost from '../../assets/main.jpeg';

const StoryPage = () => {
    return (
        <div className="story-page">
            <div className="story-container">
                <div className="section">
                    <h1 className="title">What is NewsPost</h1>
                    <p className="para">“The one place I go to find out what the best product in any category is, be it <br/> programming tools or toys.” — Christian <br/>
                    </p>
                    <p className="para">“To me, News Post is a great place to find organized and detailed information about <br/> most anything, in a way that goes beyond what typical user reviews can offer. <br/> It’s one of the best places to help make informed decisions based on community <br/> input.” — Cube the Third <br/>
                    </p>
                    <p className="para">“News Post is a platform to ask questions and get independent answers and <br/> recommendations for various products, games, and software.” — Thomas <br/>
                    </p>
                    <p className="para">“News Post is a site which aims to have users suggest, nitpick, and rank <br/> devices/items/etc. to help other people make a decision.” — XYZForgottenMe <br/>
                    </p>
                    <p className="para">“For me, News Post is the place where the community is the prime reviewer of a <br/> product. They offer critiques and they give out unbiased, and fair critical <br/> reading to a product or service. It’s effectively a balanced and neutral<br/> community to give out recommendations to a specific use case.” — Cappuccino <br/>
                    </p>
                    <img alt="display" style={{width: '400px', height: '150px', padding: '1rem 0', marginTop: '2rem'}} src={newspost} className="image"/>
                    <p className="para">News Post is a product recommendation community that helps connect people <br/> with the best products for them. You shouldn’t have to waste time and <br/> money to find solutions to your problems. By collecting the knowledge of <br/> enthusiasts across the world through recommendations, we can quickly and <br/> confidently show people the truth about a product. <br/>
                    </p>
                    <p className="para">News Post was built on, and is being built on, three core philosophies. The first of <br/> which is that there should be no market for lemons. You should be able to <br/> make the same decisions an expert would for any purchase, and News Post<br/> allows for that. <br/>
                    </p>
                    <p className="para">The second is that information should be organized around a problem, not<br/> a product. You don’t just need the best laptop, you need the best laptop for<br/> your needs. What are you really looking for? That’s what we want to help<br/> you find — the best products for you. <br/>
                    </p>
                    <p className="para">Finally, News Post believes in the power of the community. You use products, feel <br/> things about them, and see them in context of your life. Writers push out <br/> reviews before they can take in that context. Advertisements reframe <br/> feelings to create sales. But News Post users<br/> will only tell you what they know to be true. <br/>
                    That’s what News Post is. At its core, News Post is a place where people control the<br/> marketplace. We dream of a world where products succeed or fail on<br/> their own merits, and allowing people the space to share their thoughts<br/> is the first step in achieving that. <br/>
                    </p>
                    <p className="para">Hope you like the site.<br/>
                    </p>
                </div>
            </div>   
        </div>
    )
}

export default StoryPage;