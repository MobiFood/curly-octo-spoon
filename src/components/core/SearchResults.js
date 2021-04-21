import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import BackgroundImage from '@assets/images/home.webp';
import Loading from '@components/shared/Loading';
import { db } from '@config/firebaseconfig';
import _ from 'lodash';

export class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showDropdown: false,
      query: '',
      restaurantName: this.props.match.params.restaurant || '',
      foodItem: this.props.match.params.foodItem || '',
      type: null,
      data: null,
    };
  }

  componentDidMount() {
    if (this.state.restaurantName !== this.state.foodItem) {
      // foodItem in a restaurant
      db.collection('restaurants')
        .get()
        .then(qss => {
          let docs = qss.docs.map(doc => doc.data());

          let doc = _.filter(docs, restaurants =>
            _.find(
              restaurants.menu,
              menuItems =>
                menuItems.itemName.toUpperCase() === this.state.foodItem
            )
          );
          console.log(doc);
          this.setState({ type: 'food_items', loading: false, data: doc });
        });
    } else {
      // restaurant
      db.collection('restaurants')
        .get()
        .then(qss => {
          let docs = qss.docs.map(doc => doc.data());

          let doc = _.find(
            docs,
            res => res.name.toUpperCase() === this.state.restaurantName
          );
          console.log(doc);
          this.setState({ type: 'restaurant', loading: false, data: doc });
        });
    }
  }
  render() {
    if (this.state.loading) return <Loading />;
    if (this.state.type === 'restaurant')
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
          <div className='container mt-2 flex-grow-1'>
            <h1
              style={{ fontSize: '3rem', fontFamily: 'serif' }}
              className='font-weight-bold text-center pb-3'
            >
              {this.state.data && this.state.data.name}
            </h1>
            <div
              className='d-flex justify-content-around'
              style={{ overflowX: '' }}
            >
              {this.state.data &&
                this.state.data.menu.map(menuItem => (
                  <div
                    className='card border-0 shadow'
                    style={{
                      borderRadius: '1rem',
                      width: '30vw',
                      // height: '40vh',
                      overflow: 'hidden',
                    }}
                    role='button'
                    onClick={() => NotificationManager.info('Food details')}
                  >
                    <img
                      className='card-img-top'
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0KYT0fgQFHwA6gWgZC9uGdC6HW1zvwWblA&usqp=CAU'
                      alt=''
                      style={
                        {
                          //   boxShadow: "0 0 8px 8px white inset",
                        }
                      }
                    />
                    <div className='card-body'>
                      <h4 className='card-title'>{menuItem.itemName}</h4>
                      <p className='card-text'>{menuItem.description}</p>
                      <p className='card-text'>${menuItem.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className='container mt-2 flex-grow-1'>
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
          <div className='row flex-row mx-auto' style={{ overflowX: 'hidden' }}>
            {this.state.data && this.state.data.name}
            <div className='card text-white mx-1 bg-primary h-100'>
              <img
                className='card-img-top'
                src='https://via.placeholder.com/150'
                alt='FoodItem'
                style={{ width: '' }}
              />
              <div className='card-body'>
                <h4 className='card-title'>Paneer Makhanwala</h4>
                <p className='card-text'>Tasty</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default SearchResults;
