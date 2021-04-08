import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Spinner from './components/spinner/spinner';

const HomePage = lazy(() => import('./pages/homepage/homepage'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'))
const BusinessPage = lazy(() => import('./pages/business-page/business-page'))
const NewsPage = lazy(() => import('./pages/news-page/news-page'))
const EntertainmentPage = lazy(() => import('./pages/entertainment-page/entertainment-page'))
const HealthPage = lazy(() => import('./pages/health-page/health-page'))
const SportsPage = lazy(() => import('./pages/sports-page/sports-page'))
const TechnologyPage = lazy(() => import('./pages/technology-page/technology-page'))
const WritePostPage = lazy(() => import('./pages/writepost-page/writepost-page'))
const DetailsPage = lazy(() => import('./pages/details-page/details-page'))
const PostsPage = lazy(() => import('./pages/posts-page/posts-page'))
const EditProfile = lazy(() => import('./pages/edit-profile/edit-profile'))
const StoryPage = lazy(() => import('./pages/story-page/story-page'))


const App = () => {
  
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/signin" component={SignInAndSignUpPage} />
            <Route exact path="/business" component={BusinessPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/entertainment" component={EntertainmentPage} />
            <Route exact path="/health" component={HealthPage} />
            <Route exact path="/sports" component={SportsPage} />
            <Route exact path="/technology" component={TechnologyPage} />
            <Route exact path="/writenews" component={WritePostPage} />
            <Route exact path="/details" component={DetailsPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/story" component={StoryPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  )
};

export default App;