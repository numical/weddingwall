import React, { Component } from 'react';
import Choose from './Choose';
import Error from './Error.js';
import FetchError from './FetchError';
import GlobalNav from '../components/GlobalNav';
import Home from './Home';
import SavePhoto from './SavePhoto';
import TakePhoto from './TakePhoto';
import UploadPhoto from './UploadPhoto';
import UAParser from 'ua-parser-js';
import './Pages.css';

const pages = {
  'choose': Choose,
  'error': Error,
  'fetchError': FetchError,
  'home': Home,
  'savePhoto': SavePhoto,
  'takePhoto': TakePhoto,
  'uploadPhoto': UploadPhoto
};

class Pages extends Component {
  constructor (props) {
    super(props);
    this.back = this.back.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.state = this.createInitialState();
    this.state.navigationMethods = this.createNavigationMethods();
    if(window.history) {
      this.updateHistory();
      window.onpopstate = this.interceptBackButton.bind(this);
    }
  }

  createInitialState () {
    return {
      pageName: 'home',
      previousPage: null
    };
  }

  createNavigationMethods () {
    const baseNavigationMethod = (pageName, nextPageProps, clearPreviousPage) => {
      this.setState({
        ...this.state,
        nextPageProps,
        pageName,
        previousPage: this.updateHistory(clearPreviousPage),
      });
      window.scrollTo(0, 0);
    };
    const navigationMethods = {};
    Object.keys(pages).forEach((pageName) => {
      navigationMethods[pageName] = baseNavigationMethod.bind(null, pageName);
    });
    navigationMethods.back = this.back;
    const parser = new UAParser();
    const { name } = parser.getOS();
    navigationMethods.share = (name === 'iOS') ? navigationMethods['uploadPhoto'] : navigationMethods['choose'];
    return navigationMethods;
  }

  interceptBackButton (event) {
    this.back();
  }

  updateHistory (clearPreviousPage) {
    const { pageName, nextPageProps } = this.state;
    if (window.history) {
      window.history.pushState(pageName, pageName);
    }
    return (clearPreviousPage) ? null : { pageName, nextPageProps };
  }

  back () {
    const { navigationMethods, previousPage } = this.state;
    if (previousPage) {
      const { pageName, nextPageProps } = previousPage;
      navigationMethods[pageName](nextPageProps, true);
    } else {
      this.state.navigationMethods['home'](null, true);
    }
  }

  selectPage (pageProps) {
    const { pageName } = this.state;
    const Page = pages[pageName];
    if (Page) {
      return (<Page {...pageProps} />);
    } else {
      return (<Error err={`Unknown page: '${pageName}'`} />);
    }
  }

  render () {
    const { navigationMethods, nextPageProps } = this.state;
    const pageProps = { ...navigationMethods, ...nextPageProps };
    return (
      <div className='flexContainerColumn Pages-container'>
        <GlobalNav {...pageProps} />
        { this.selectPage(pageProps) }
      </div>
    );
  }
}

export default Pages;
