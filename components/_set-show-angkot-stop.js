import React from "react";
import { View, Text } from "react-native";
import _GlobalStyles from "../styles/global";
import {Switch} from "react-native-paper"

const ShowAngkotStop = ({isEnabled, setIsEnabled}) => {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={_GlobalStyles.menu_row}>
      <Text style={{flex: 1}}>
        {isEnabled 
          ? "Tampil" 
          : "Tidak Tampil"
        }
      </Text>
      <Switch
        // trackColor={{ false: "#f4f4f4", true: "#6FCF97" }}
        thumbColor={"#ffffff"}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
      />
    </View>
  );
}

export default ShowAngkotStop
