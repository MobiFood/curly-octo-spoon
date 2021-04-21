import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loading.scss';

export class Loading extends Component {
  render() {
    return (
      <div id='Loading'>
        <div className='boxes'>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
