import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
  static propTypes = {
    ctr: PropTypes.number.isRequired,
    onIncrementCounter: PropTypes.func.isRequired,
    onDecrementCounter: PropTypes.func.isRequired,
    onAddCounter: PropTypes.func.isRequired,
    onSubstractCounter: PropTypes.func.isRequired,
    onStoreResult: PropTypes.func.isRequired,
    onDeleteResult: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case 'inc':
        this.setState(prevState => ({ counter: prevState.counter + 1 }));
        break;
      case 'dec':
        this.setState(prevState => ({ counter: prevState.counter - 1 }));
        break;
      case 'add':
        this.setState(prevState => ({ counter: prevState.counter + value }));
        break;
      case 'sub':
        this.setState(prevState => ({ counter: prevState.counter - value }));
        break;
      default:
    }
  };

  render() {
    const {
      ctr,
      results,
      onIncrementCounter,
      onStoreResult,
      onDecrementCounter,
      onAddCounter,
      onSubstractCounter,
      onDeleteResult,
    } = this.props;
    return (
      <div>
        <CounterOutput value={ctr} />
        <CounterControl label="Increment" clicked={onIncrementCounter} />
        <CounterControl label="Decrement" clicked={onDecrementCounter} />
        <CounterControl label="Add 5" clicked={onAddCounter} />
        <CounterControl label="Subtract 5" clicked={onSubstractCounter} />

        <hr />
        <button onClick={() => onStoreResult(ctr)}>StoreResult</button>
        <ul>
          {results.map((ele, index) => (
            <li onClick={() => onDeleteResult(ele.id)} key={index}>
              {ele.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Counter.propType = {
//   ctr: PropTypes.number.isRequired,
// };

const mapStateToProps = state => ({
  ctr: state.ctr.counter,
  results: state.res.results,
});

const mapDispatchToProps = dispatch => ({
  onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
  onDecrementCounter: () => dispatch({ type: actionTypes.DECTRMENT }),
  onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 5 }),
  onSubstractCounter: () => dispatch({ type: actionTypes.SUBSTRACT, value: 10 }),
  onStoreResult: res => dispatch({ type: actionTypes.STORE_RESULT, result: res }),
  onDeleteResult: resultId => dispatch({ type: actionTypes.DELETE_RESULT, resultId }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
