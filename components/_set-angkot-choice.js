import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import _GlobalStyles from '../styles/global';

function SetAngkotChoice ({selectedAngkot, setSelectedAngkot}) {
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
        onValueChange={(itemValue, itemIndex) => {
          setSelectedAngkot(itemValue)
          return;
        }}>
        <Picker.Item label={"Pilih angkot"} value={null}/>
        {list.map((data, index) => {
          return (
            <Picker.Item label={data?.nama_jenis} value={data} key={index}/>
          )
        })}
      </Picker>
    : null
  )
}

export default SetAngkotChoice