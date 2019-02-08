import {StyleSheet} from 'react-native'
import Constants from '../../../../common/Constants';

export default StyleSheet.create({
  container:{
    paddingLeft: 10,
    paddingRight: 5,
    width: 100
  },
  button:{
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center'
  },
  wrap:{
    alignItems:'center'
  },
  title:{
    marginTop: 6,
    fontSize: 11,
    fontFamily: Constants.fontHeader,
    opacity: 0.8
  },
  icon:{
    width: 36,
    height: 36,
    resizeMode:'contain',
    tintColor: '#FFF'
  },

  background: {
    backgroundColor: '#f1f1f1',

    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center'
  }
})
