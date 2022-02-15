import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AuthContext from "../context/authContext";
import PersonalContext from "../context/personalContext";

function AccountScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const { maxCalories } = useContext(PersonalContext);
  const { personalInfo } = useContext(PersonalContext);

  const logout = () => {
    setUser();
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.firstName + " " + user.lastName}
          subTitle={user.email}
          image={require("../assets/user.jpg")}
          iconName=""
        />
        <ListItem title="Age:" subTitle={personalInfo.age} iconName="" />
        <ListItem title="Weight:" subTitle={personalInfo.weight} iconName="" />
        <ListItem title="Height:" subTitle={personalInfo.height} iconName="" />
        <ListItem
          title="Calories for weight loss:"
          subTitle={Math.round(maxCalories)}
          iconName=""
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={logout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
