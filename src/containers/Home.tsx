import * as React from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { concentrationDistribution } from '../core';

import { Cell } from '../types';

import { LineChart } from 'react-easy-chart';
interface Props {
  isLoaded: string;
}

type CellArray = Cell[];

interface State {
  data: CellArray[];
  isData: boolean;
  range: number;
  step: number;
  time: number;
  error: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      isData: false,
      range: undefined,
      step: undefined,
      time: undefined,
      error: false
    };
  }

  onClick = () => {
    if (
      this.state.range > 10 ||
      this.state.range < 0 ||
      this.state.step > 2 ||
      this.state.step < 0 ||
      this.state.time < 0
    ) {
      this.setState({ error: true });
      return;
    }

    const data = [...this.state.data];
    const step = this.state.step * 1e-7;
    const range = this.state.range * 1e-7;
    const time = this.state.time * 60;

    const line = concentrationDistribution(step, range, time);
    data.push(line);
    this.setState({ data, isData: true }, () =>
      document.getElementById('graphic').scrollIntoView(false)
    );
  };

  rangeOnChange = event => {
    this.setState({ range: event.target.value });
  };

  stepOnChange = event => {
    this.setState({ step: event.target.value });
  };

  timeOnChange = event => {
    this.setState({ time: event.target.value });
  };

  onDismiss = () => {
    this.setState({ error: false });
  };

  render() {
    return (
      <div className='main-content'>
        <h1 className='main-content__title text'>
          Изменение профиля распределения примеси при увеличении времени в
          случае диффузии из ограниченного источника ёмкости.
        </h1>
        <div className='main-content__work-space'>
          <p className='main-content__description text'>
            Введите параметры ниже и нажмите на кнопку "Рассчитать". Каждое
            нажатие на кнопку "Рассчитать" добавляет новый график.
          </p>
          {this.state.error ? (
            <Alert
              isOpen={this.state.error}
              toggle={this.onDismiss}
              color='danger'
            >
              Проверьте введённые значения!
            </Alert>
          ) : null}
          <Form className='form-container'>
            <FormGroup>
              <Label className='text'>
                Диапозон задаваемый по оси Х (в микрометрах)
              </Label>
              <Input
                value={this.state.range}
                min={0}
                max={10}
                type='number'
                onChange={this.rangeOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className='text'>
                Шаг рассчёта по оси X (в микрометрах)
              </Label>
              <Input
                min={0}
                max={2}
                type='number'
                onChange={this.stepOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className='text'>Время (в минутах)</Label>
              <Input
                min={1}
                max={50}
                type='number'
                onChange={this.timeOnChange}
              />
            </FormGroup>
            <Button onClick={this.onClick} className='text form__button'>
              Рассчитать
            </Button>
          </Form>
          {this.state.isData ? (
            <div id='graphic' className='work-space__graphic'>
              <p className='graphic__Y'>Распределение примеси(Y)</p>
              <LineChart
                axes
                xDomainRange={[
                  0,
                  this.state.data[0][this.state.data[0].length - 1].x + 2
                ]}
                yDomainRange={[0, 0.8]}
                margin={{ top: 10, right: 30, bottom: 50, left: 70 }}
                grid
                verticalGrid
                interpolate={'cardinal'}
                width={800}
                height={400}
                data={this.state.data}
              />
              <p className='graphic__X'>Изменяемая величина X</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoaded: state.graph.isLoaded
});

export default connect(
  mapStateToProps,
  null
)(Home);
