import * as React from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { concentrationDistribution } from '../core';

interface Props {
  isLoaded: string;
}

class Home extends React.Component<Props, null> {
  render() {
    console.log(concentrationDistribution(1e-6, 5e-6, 600));
    return (
      <div className="main-content">
        <h1 className="main-content__title">
          Изменение профиля распределения примеси при увеличении времени в
          случае диффузии из ограниченного источника ёмкости.
        </h1>
        <div className="main-content__work-space">
        <p className='main-content__description'>
          Введите параметры ниже и появится график.
        </p>
          <Form>
            <FormGroup>
              <Label>X coordinate</Label>
              <Input/>
            </FormGroup>
            <FormGroup>
              <Label>Step of X</Label>
              <Input/>
            </FormGroup>
            <FormGroup>
              <Label>Time</Label>
              <Input/>
            </FormGroup>
          </Form>
          <div className="work-space__graphic" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: state.graph.isLoaded
});

export default connect(
  mapStateToProps,
  null
)(Home);
