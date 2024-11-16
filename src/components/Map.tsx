import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";

function Map() {
  const mapStyles = {
    height: "300px",
    width: "100%",
    position: "relative", // Adicionando position relative para permitir posicionamento absoluto do botão
  };

  return (
    <div className="px-10 pb-20 relative">
      <LoadScript googleMapsApiKey="AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E">
        <GoogleMap
          mapContainerStyle={mapStyles as any}
          zoom={8}
          center={{ lat: 38.7, lng: -10.13 }}
        />
      </LoadScript>
      <div className="flex items-center">
        <button className="flex bg-pink-800 hover:bg-pink-900 items-center text-white font-bold py-2 px-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FaMapMarkerAlt className="text-white pr-1 " /> Procura na tua zona
        </button>
      </div>
    </div>
  );
}

export default Map;
