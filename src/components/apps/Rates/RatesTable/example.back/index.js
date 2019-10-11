import React, { createRef } from 'react'


import { SelectableGroup } from '../src'
import List from './List'
import TableHeader from './TableHeader'
import Filter from './Filter';
import RateDrawer from './RateDrawer';
import './stylesheet.css';



class RatesTable extends React.Component {

  constructor() {
    super();
    this.selectionRef = createRef();
  }

  state = {
    firstSelected: null,
    minSelected:null,
    maxSelected:null,
  }

  handleSelectionClear = () => {
    this.setState({
      firstSelected: null,
      minSelected:null,
      maxSelected:null,
    });
  }

  handleSelectionFinish = selectedItems => {

   this.getMinMaxSelected(selectedItems);
   console.log('handleSelectionFinish');
   this.setState({
      firstSelected: null,
    });
  };

  handleSelecting = selectingItems => {
    this.setFirstSelected(selectingItems);
    this.getMinMaxSelected(selectingItems);
  }

  setFirstSelected = selectingItems => {
    if( this.state.firstSelected === null ){
      // let itemid = 0;
      const arrItems = [...selectingItems];
      arrItems.forEach( item => {
        const {id: itemid} = item.props;
        console.log("firstSelected", item.props);
        if( this.state.firstSelected === null ){
          this.setState({
            firstSelected: itemid,
          });
          console.log("firstSelected", itemid);
        }
      });
    }
  }

  getMinMaxSelected = selectedItems => {
    if( selectedItems.size < 1 )
      return;

    const {firstSelected: first} = this.state;
    const arrItems = [...selectedItems];

    const arrSelected = [];
    arrItems.forEach( item => {
      const {id: itemid} = item.props;
      arrSelected.push(itemid);
    });
    if( arrSelected.length < 1){
      return;
    }
    let minSelected = null;
    let maxSelected = null;
    if(arrSelected.length === 1){
      minSelected = arrSelected[0];
      maxSelected = arrSelected[0];
    }
    else{
      const min = Math.min(...arrSelected);
      const max = Math.max(...arrSelected);
      
      let last;
      if( first === min ){
        last = max;
      }
      else if( first === max ){
        last = min;
      }

      if(min<first) {
        if( max === first+7 || max === first+14 || max === first+21 ) {
          last=max-(first-min);
        }
        else if(min === first-7 || min === first-14 || min === first-21) {
          last=min+(max-first);
        }
      }
      const arrFirst = [first, last];
      minSelected = Math.min(...arrFirst);
      maxSelected = Math.max(...arrFirst);
    }
    
    console.log("first last", minSelected, maxSelected);
      
    
    this.setState({
      minSelected,
      maxSelected,
    });
  }

  render() {
    const { items } = this.props;
    const {minSelected, maxSelected} = this.state;


    // console.log("first last", minSelected, maxSelected);

    let updatedItems = items;
    if( minSelected !== null && maxSelected !== null){
      updatedItems = items.map(item => {
        item.highlighted = false;
        if( item.id >= minSelected && item.id <= maxSelected){
          item.highlighted = true;
        }
        return item;
      });
    }

    // console.log( 'updatedItems', updatedItems );

    return (
      <React.Fragment>
        <Filter />
        <TableHeader />
        <SelectableGroup
          ref={this.selectionRef}
          className="main"
          clickClassName="tick"
          enableDeselect
          tolerance={0}
          deselectOnEsc={false}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
          // ignoreList={['.not-selectable']}
          resetOnStart
          allowClickWithoutSelected
        ><List items={updatedItems} />
        </SelectableGroup>
        <RateDrawer />
      </React.Fragment>
    );
  }
  
}



export default RatesTable;
