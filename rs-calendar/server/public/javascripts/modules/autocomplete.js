function autocomplete(input, latInput, lngInput) {
  if(!input) return;//return if there is no input
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
  //if someone hits enter on the address field, don't submit the form
  input.on('keydown', (e) => {
    if(e.keycode === 13) e.preventDefault();
  })
}

export default autocomplete;
