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
            return <div className='listItem' key={catObj.id}><img className='profileItem'src={catObj.imageUrl} alt='cat image'/><span className='label' className='profileItem'> Name: {catObj.name} </span><span className='label profileItem'> Breed: {catObj.breed}</span></div>
          })}
        </div>

      </div>
    )
  }
}

export default CatProfiles;