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
import Icon from "react-native-vector-icons/Ionicons";
import {Icons, Languages, Color, withTheme, Config} from '@common'

import ExpandComponent from '../../ExpandComponent'
import {Chips} from '@components'
const isDark = Config.Theme.isDark

class Recents extends React.Component {
  state  = {
    expanded: true,
  }

  render() {
    let {histories, onClear, onSearch, searchText} = this.props
    let {expanded} = this.state
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    if (histories.length == 0) {
      return <View />
    }

    return (
      <ExpandComponent
        ref="expandComponent"
        contentView={(
          <View style={styles.container}>
            <TouchableOpacity onPress={this.toggle} style={styles.recents}>
              <Text style={[styles.text, {color: text}]}>{Languages.Recents}</Text>
              <Icon name={expanded ? Icons.Ionicons.DownArrow : Icons.Ionicons.RightArrow} size={20} color={isDark ? "#fff" : "#000"}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClear}>
              <Image source={require("@images/ic_trash.png")} style={[styles.icon, isDark && {tintColor: "#fff"}]}/>
            </TouchableOpacity>
          </View>
        )}
        expandView={(
          <Chips items={histories} selectedItem={searchText} onPress={onSearch}/>
        )}
        onChangeStatus={this.onChangeStatus}/>
    )
  }

  onChangeStatus = (expanded)=>{
    this.setState({expanded})
  }

  toggle = ()=>{
    this.refs.expandComponent.toggle()
  }
}

export default withTheme(Recents)
