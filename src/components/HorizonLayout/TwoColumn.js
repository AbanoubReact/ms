/** @format */

import React, { PureComponent } from "react";
import { Text, TouchableOpacity , View ,Button } from "react-native";
import { Images, Styles, withTheme , ShopButton ,Languages , Color, Constants, Tools} from "@common";
import { WishListIcon, ImageCache, ProductPrice } from "@components";
import { getProductImage , Icon} from "@app/Omni";
import css from "./style";

class TwoColumn extends PureComponent {
  render() {
    const {
      title,
      product,
      viewPost,
      theme: {
        colors: { text },
      },
    } = this.props;
    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, 180)
        : Images.PlaceHolderURL;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelTwo}
        onPress={viewPost}>
        <ImageCache uri={imageURI} style={css.imagePanelTwo} />
        <Text numberOfLines={2} style={[css.nameTwo, { color: text }]}>
          {title}
        </Text>
        <ProductPrice product={product} hideDisCount />
        <WishListIcon product={product} />
        <View style={{ flexDirection: "row" ,height:40, flex: .75,}}>
        <TouchableOpacity
         onPress={viewPost}
         
          style={
            {
              alignItems: 'center',
              backgroundColor: '#54a6b0',
              padding: 10,
              flex:4,
              
            }
          }>
          <Text style={{marginBottom:9}}>المزيد من التفاصيل</Text>
        </TouchableOpacity>
        {/* <View style={{flex:4,
        alignItems: 'center',
          backgroundColor:'#218a96',
        }}>
        <Text>اضف للمفضلة</Text>
        <WishListIcon product={product}  />
        </View> */}
       
        
        
      </View>
      </TouchableOpacity>
      
    );
    
  }
}

export default withTheme(TwoColumn);
