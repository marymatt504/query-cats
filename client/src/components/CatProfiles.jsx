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
        Cat Profiles
        <div className='listItemContainer'>
          {this.props.cats.map(catObj => {
            return <div className='listItem' key={catObj.id}><img src={catObj.imageUrl} alt='cat image'/><span>Name: {catObj.name}</span><span>Breed: {catObj.breed}</span></div>
          })}
        </div>

      </div>
    )
  }
}

export default CatProfiles;