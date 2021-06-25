import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Spinner from './components/spinner/spinner';

const HomePage = lazy(() => import('./pages/homepage/homepage'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'))
const CategoryPage = lazy(() => import('./pages/category-page/category-page'))
const WritePostPage = lazy(() => import('./pages/writepost-page/writepost-page'))
const EditPostPage = lazy(() => import('./pages/editpost-page/editpost-page'))
const DetailsPage = lazy(() => import('./pages/details-page/details-page'))
const PostsPage = lazy(() => import('./pages/posts-page/posts-page'))
const EditProfile = lazy(() => import('./pages/edit-profile/edit-profile'))
const StoryPage = lazy(() => import('./pages/story-page/story-page'))
const testPage = lazy(() => import('./pages/testing/testing'))

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
            <Route exact path="/business" component={CategoryPage} />
            <Route exact path="/writenews" component={WritePostPage} />
            <Route exact path="/editpost" component={EditPostPage} />
            <Route exact path="/details" component={DetailsPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/story" component={StoryPage} />
            <Route exact path="/test" component={testPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  )
};

export default App;