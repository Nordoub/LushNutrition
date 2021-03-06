import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import colors from "../../constants/colors";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDeviceOrientation } from "@react-native-community/hooks";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  onPressIcon,
  renderRightActions,
  iconName = "chevron-right",
  style,
  imgStyle,
}) {
  const { landscape } = useDeviceOrientation();
  // usage:
  // renderRightActions={() => (
  //   <ListItemDeleteAction
  //     onPress={() => {
  //       swipeableRef.current.close();
  //       removeMeal(item);
  //     }}
  //   />
  // )}

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View
          style={{ ...styles.container, ...style, margin: landscape ? 0 : 15 }}
        >
          {IconComponent}
          {image && (
            <Image
              style={{
                ...styles.image,
                ...imgStyle,
              }}
              source={image}
            />
          )}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>

          <MaterialCommunityIcons
            name={iconName}
            size={30}
            color={colors.medium}
            onPress={onPressIcon}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    //padding: 15,
    backgroundColor: colors.light,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
});

export default ListItem;
