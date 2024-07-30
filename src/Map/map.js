function Map ({latitude,longitude,data}){

    return (
        <>
            {data['data'][0]['live'] && (<div className="mapouter">
                <div className="gmap_canvas">
                    <iframe width="400" height="300" id="gmap_canvas" src={`https://maps.google.com/maps?q=${latitude}%20${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="1" scrolling="no" marginheight="0" marginwidth="0">
                    </iframe>
                </div>
            </div>)}
            {!!!data['data'][0]['live'] && (<div>
                Live Location is not available for this flight
            </div>
      )}
        </>
    )
}
export default Map;
