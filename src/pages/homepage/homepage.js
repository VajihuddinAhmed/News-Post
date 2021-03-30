import React from 'react';
import PreviewSection from '../../components/preview-section/preview-section';
import CollectionMenu from '../../components/collection-menu/collection-menu';
import ReadSection from '../../components/read-section/read-section';
import WriteSection from '../../components/write-section/write-section';
import SubscribeNewsLetter from '../../components/subscribe-newsletter/subscribe-newsletter';

const HomePage = () => (
    <div className="homepage">
        <PreviewSection />
        <CollectionMenu />
        <ReadSection />
        <WriteSection />
        <SubscribeNewsLetter />
    </div>
)

export default HomePage;
