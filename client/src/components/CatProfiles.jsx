import React from 'react';

class CatProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    // console.log(this.props.cats);
    return (
      <div className='listLogicModule'>
        Cat Profiles will be here.
        {/* <p>Your Current Shopping List</p>
        <p>Select from previously purchased or type in items to add.</p>
        {/* {map over this.props.items and return a smaller div w/ spans for item} */}
        <div className='listItemContainer'>
          {this.props.items.map(itemObj => {
            return <span className='listItem' key={itemObj.id}><input type='checkbox' className='checkBox' /><span>{itemObj.name}</span><button className='closeBox'>X</button></span>
          })}
        </div> */}

      </div>
    )
  }
}

export default CatProfiles;