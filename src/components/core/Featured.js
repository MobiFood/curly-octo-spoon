import React, { Component } from 'react';

export class Featured extends Component {
  render() {
    return (
      <div>
        <div
          className='card border-0 shadow'
          style={{
            borderRadius: '1rem',
            overflow: 'hidden',
          }}
          role='button'
          onClick={() => this.props.history.push(`/search-results/${''}/${''}`)}
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
            <h4 className='card-title'>Barbeque Parade</h4>
            <p className='card-text'>
              <small>$10.55</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Featured;
