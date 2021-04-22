import { Dimensions, StyleSheet } from "react-native";

const _GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: "flex",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6
  },

  menu: {
    padding: 20,
    width: "100%",
  },

  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)' 
  },

  picker: {
    width: "100%",
  },

  menu_container: {
    padding: 20,
    backgroundColor: '#bcf',
    width: "100%",
    borderRadius: 20
  },

  h1: {
    fontWeight: "700",
    fontSize: 16,
  },

  p_gray: {
    color: '#3b3b3b',
    fontSize: 12,
  },

  separator: {
    marginVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  menu_row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
  },

  angkot_count: {
    paddingVertical: 20
  },

  angkot_count_text: {
    fontSize: 12,
    color: "#3b3b3b",
    textAlign: "center"
  }
})

export default _GlobalStyles;