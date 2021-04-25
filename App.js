import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import _GlobalStyles from './styles/global';
import axios from 'axios';
import SetAngkotChoice from './components/_set-angkot-choice';
import ShowAngkotStop from './components/_set-show-angkot-stop';
import AngkotImage from "./assets/marker-angkot.png";
// import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [geoData, setGeoData] = useState({
    "latitude": 0,
    "longitude": 0,
    "latitudeDelta": 0.04,
    "longitudeDelta": 0.04
  });
  const [selectedAngkot, setSelectedAngkot] = useState(null);
  const [angkotLocation, setAngkotLocation] = useState(null);
  const [stopLocation, setStopLocation] = useState(null);
  const [showStopLocation, setShowStopLocation] = useState(false);
  
  function findCoordinates() {
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setGeoData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      },

      error => {
        Alert.alert(error.message)
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000
      }
    )
  }
  
  useEffect(() => {
    findCoordinates()
    return () => {}
  }, [])

  function requestLokasiAngkot(intRef) {
    if (selectedAngkot) {
      axios.get(`https://srv2.gatot.id/reksismul/data/lokasi-angkot?id_jenis_angkot=${selectedAngkot?.id_jenis_angkot}`)
      .then(({data}) => {
        setAngkotLocation(data)
      })
      .catch(err => {
        setAngkotLocation(null)
        clearInterval(intRef)
      })
    }
  }

  function requestLokasiPemberhentianAngkot() {
    if (selectedAngkot) {
      axios.get(`https://srv2.gatot.id/reksismul/data/pemberhentian-angkot?id_jenis_angkot=${selectedAngkot?.id_jenis_angkot}`)
      .then(({data}) => {
        setStopLocation(data)
      })
      .catch(err => {
        setStopLocation(null)
      })
    }
  }

  useEffect(() => {
    const intRef = setInterval(() => {
      requestLokasiAngkot(intRef)
    }, 5000)

    requestLokasiAngkot(intRef)
    requestLokasiPemberhentianAngkot()

    if (selectedAngkot === null) {
      setAngkotLocation(null)
      setStopLocation(null)
    }

    return () => {
      clearInterval(intRef)
    }
  }, [selectedAngkot])

  return (
    <ScrollView>
      <MapView
        style={_GlobalStyles.map}
        region={geoData}
        onRegionChangeComplete={region => setGeoData(region)}
        showsUserLocation={true}
        showsCompass={true}
      >
        {/* <Marker coordinate={{latitude: -6.2600545, longitude: 106.9953933}}/>
        <Marker coordinate={{latitude: -6.2191171, longitude: 106.9501725}}/> */}
        {
          showStopLocation && stopLocation
          ? 
            <>
              {stopLocation?.map(({latitude, longitude}, index) => {
                return (
                  <Marker coordinate={{latitude, longitude}} key={index} image={{uri: "https://i.ibb.co/TPVP893/Subtract.png"}}/>
                )
              })}
            </>
          : null
        }
        {
          angkotLocation?.map(({latitude, longitude}, index) => {
            return (
              <Marker coordinate={{latitude, longitude}} key={index} image={{uri: "https://i.ibb.co/Rg5tJ6G/marker-angkot.png"}}/>
            )
          })
        }
      </MapView>
      
      <View style={_GlobalStyles.menu}>
        <View style={_GlobalStyles.menu_container}>
          <View>
            <Text style={_GlobalStyles.h1}>Jenis Angkot</Text>
            <Text style={_GlobalStyles.p_gray}>{selectedAngkot?.nama_jenis || "Pilih jenis angkot terlebih dahulu"}</Text>
            <SetAngkotChoice
              selectedAngkot={selectedAngkot}
              setSelectedAngkot={setSelectedAngkot}
            />  
          </View>
          <View style={_GlobalStyles.separator}/>
          <View>
            <View>
              <Text style={_GlobalStyles.h1}>Tampilkan Pemberhentian Angkot</Text>
            </View>
            <ShowAngkotStop
              isEnabled={showStopLocation}
              setIsEnabled={setShowStopLocation}
            />
          </View>
        </View>
        {
          angkotLocation && selectedAngkot
          ? <View style={_GlobalStyles.angkot_count}>
              <Text style={_GlobalStyles.angkot_count_text}>
                {
                  angkotLocation.length > 0
                    ? `Jumlah angkot: ${angkotLocation.length}`
                    : "Tidak ada angkot yang mengirimkan lokasinya"
                }
              </Text>
            </View>
          : null
        }

        {/* <View style={{paddingVertical: 20}}>
          <Text style={_GlobalStyles.h1}>DEBUG WINDOW</Text>
          <Text style={{paddingVertical: 5, fontSize: 12, color: '#3b3b3b'}}>Selected Angkot: {JSON.stringify(selectedAngkot, ' ', 4)}</Text>
          <Text style={{paddingVertical: 5, fontSize: 12, color: '#3b3b3b'}}>Angkot Location: {JSON.stringify(angkotLocation, ' ', 4)}</Text>
          <Text style={{paddingVertical: 5, fontSize: 12, color: '#3b3b3b'}}>Stop Location: {JSON.stringify(stopLocation, ' ', 4)}</Text>
          <Text style={{paddingVertical: 5, fontSize: 12, color: '#3b3b3b'}}>Show Stop Location: {JSON.stringify(showStopLocation, ' ', 4)}</Text>
        </View> */}
      </View>
      
      <StatusBar style="auto"/>
    </ScrollView>
  );
}
