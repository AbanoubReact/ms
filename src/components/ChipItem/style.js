import {StyleSheet, Platform} from 'react-native'
import {Color, Config, Theme} from '@common'
const isDark = Config.Theme.isDark

export default StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: isDark ? "#717070" : "#f2f4f8",
    marginRight: 4,
    marginBottom: 6
  },
  text:{
    fontSize: 14,
    color: isDark ? "#fff" : Color.primary
  },
  selected:{
    backgroundColor: isDark ? "#434343" : "#fff",
    borderWidth: 1,
    borderColor: isDark ? "#fff" : Color.primary
  }
})
