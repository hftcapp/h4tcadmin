import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import '../Styles/Mapautocomplete.css';

class Mapautocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    console.log(address);
    this.setState({ address });
  };

  handleSelect = async address => {
    let res;
    console.log(address);

    await geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        res = { address, lat: latLng.lat, lng: latLng.lng };
      })
      .catch(error => console.error('Error', error));

    console.log(res);
    this.props.handlePlaceSelected(res);
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        style={{ background: '#ffffff', color: 'red', zIndex: '999999' }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input mt-2',
                style: {
                  width: '100%',
                  height: '35px',
                  border: '1px solid grey',
                  shadow: 'none',
                  borderRadius: '8px',
                  padding: '10px'
                }
              })}
            />
            <div
              className=" autocomplete "
              styles={{
                listView: {
                  position: 'absolute',
                  backgroundColor: '#FFF',
                  zIndex: 1000000 //Forcing it to front
                }
              }}
            >
              {console.log(suggestions)}
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: '#0275d8',
                      color: 'white',
                      cursor: 'pointer',
                      borderBottom: '1px solid grey',
                      width: '100%'
                    }
                  : {
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      borderBottom: '1px solid grey',
                      width: '100%'
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span className=" p-3" style={{}}>
                      <i class="fas fa-map-marker-alt"></i>{' '}
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Mapautocomplete;
