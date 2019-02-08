import React from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Text
} from 'react-native'
import styles from './style'
import {withTheme} from '@common'

class Item extends React.Component {
  static defaultProps = {
    label: "Restaurants"
  }

  render() {
    let {item, label, onPress, selected} = this.props
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    return (
      <TouchableOpacity onPress={()=>onPress(item)} style={[styles.container, selected && styles.selected]}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    )
  }

}

export default withTheme(Item)
