import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackgroundImage from '@assets/images/home.webp';
import $ from 'jquery';
import { db } from '@config/firebaseconfig';
import Loading from '@components/shared/Loading';
import { Route } from 'react-router-dom';
import Featured from './Featured';
import _ from 'lodash';
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showDropdown: false,
      query: '',
      restaurants: [],
    };
  }
  componentDidMount() {
    db.collection('restaurants')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data = data.map(restaurant => [
          restaurant.name.toUpperCase(),
          ...restaurant.menu.map(i => i.itemName.toUpperCase()),
        ]);
        this.setState({
          restaurants: data,
          loading: false,
        });
      });
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div className='flex-grow-1 h-100'>
        <div
          className='w-100'
          style={{
            position: `absolute`,
            height: `100vh`,
            zIndex: -1,
            top: 0,
            left: 0,
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundSize: `contain`,
            backgroundRepeat: 'no-repeat',
            filter: 'blur(10px)',
          }}
        />

        <div className='h-100 d-flex flex-column justify-content-around'>
          <div className='form-group w-75 mx-auto'>
            <input
              autoFocus
              autoComplete='off'
              type='text'
              className='form-control'
              name='search'
              id='search'
              placeholder='Search'
              value={this.state.query}
              onChange={event => this.setState({ query: event.target.value })}
              onFocus={() => {
                this.setState({ showDropdown: true }, () =>
                  $('#dropdownContainerList').slideDown('fast')
                );
              }}
              onBlur={() => {
                setTimeout(() => {
                  $('#dropdownContainerList').slideUp('fast', () =>
                    this.setState({ showDropdown: false, query: '' })
                  );
                }, 400);
              }}
            />
            {this.state.showDropdown && (
              <div
                id='dropdownContainerList'
                className='list-group'
                style={{
                  height: '20vh',
                  display: 'none',
                  overflowY: 'auto',
                }}
              >
                {this.state.restaurants
                  .map(restaurant =>
                    restaurant.filter(ki =>
                      ki.includes(this.state.query.toUpperCase())
                    )
                  )
                  .map((j, indexJ) =>
                    j.length === 0
                      ? 'No items'
                      : j.map((i, indexI) => (
                          <div
                            key={`${
                              (indexJ + 1) * (indexI + 1) + indexI
                            }-menu-item`}
                            className='list-group-item rounded-0 dropdown-item bg-'
                            role='button'
                            onClick={() => {
                              this.props.history.push(
                                `/search-results/${j[0]}/${i}`
                              );
                            }}
                          >
                            <small className='text-muted'>
                              {i === j[0] && 'Hotel    '}
                            </small>
                            <span className=''>{i}</span>
                          </div>
                        ))
                  )}
              </div>
            )}
          </div>
          <div
            className='w-100 d-flex align-items-end mb-5 justify-content-around'
            id='featuredFood'
          >
            <Route component={Featured} />
            <Route component={Featured} />
            <Route component={Featured} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
