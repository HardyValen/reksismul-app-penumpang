import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ToastAndroid} from 'react-native';
import _GlobalStyles from '../styles/global';
// import * as Application from 'expo-application';
// import * as Device from 'expo-device';

function SetAngkotChoice ({selectedAngkot, setSelectedAngkot, enabled}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://srv2.gatot.id/reksismul/data/jenis-angkot")
    .then(({data}) => {
      setList(data)
    })
    return () => {}
  }, [])

  return (
    list.length > 0
    ? <Picker 
        style={_GlobalStyles.picker}
        selectedValue={selectedAngkot}
        enabled={enabled}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedAngkot(itemValue)
          return;
        }}>
        <Picker.Item label={"Pilih angkot"} value={null}/>
        {list.map((data, index) => {
          return (
            <Picker.Item label={data.nama_jenis} value={data} key={index}/>
          )
        })}
      </Picker>
    : null
  )
}

export default SetAngkotChoice