import React from "react";
// UI
import { ScrollView } from "react-native";
import { Text, View } from "react-native-ui-lib";
import AuthenticateHeader from "../AuthenticateHeader/AuthenticateHeader";
import { UserStates } from "../../variables";
import { useSelector } from "react-redux";

// styles
import _styles from "./styles";

const Page = ({
  title,
  topChildren,
  children,
  topProps = {},
  contentProps = {},
  style = {},
  scroller,
  navigation,
}) => {
  const styles = _styles();
  const { user } = useSelector(({ user }) => ({ user }));

  return (
    <View style={[styles.root, style.root]}>
      <View center bg-primary style={[styles.top]} {...topProps}>
        {title && user.state === UserStates.SIGNED_IN ? (
          <View style={styles.topTitle}>
            <Text white h1>
              {title}
            </Text>
          </View>
        ) : (
          topChildren
        )}
      </View>

      {scroller ? (
        <>
          <ScrollView
            contentContainerStyle={[styles.content, style.content]}
            {...contentProps}
          >
            {children}
          </ScrollView>
        </>
      ) : (
        <View
          style={[styles.content, style.content]}
          bg-containerBG
          {...contentProps}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default Page;
