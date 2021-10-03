- Commit [33ff44][1] fixed a similar issue (`Text component does not disable click functionality when disabled #30947`).
- The issue does not reproduce if the `<Text />` component has `accessibilityRole="button"` see issue [#31033][2]
- `Text` component is not touchable by default, becomes touchable with an `onPress` prop.
- We need to have `accessibilityRole="button"` for something to be recognized as pressable (issue [30947][3])

>I've since realized that we need to set accessibilityRole="button" for the screenreaders to recognize something as clickable.

from https://github.com/facebook/react-native/issues/30947#issuecomment-779500616

>I notice that we hardcode the values of selected and enabled here and it seems to be expecting that somewhere we override these values by the comment immediate following:

https://github.com/fabriziobertoglio1987/react-native-notes/blob/4bd5450b6e54ffe99556598a4ba6fb44a61b7177/ReactAndroid/src/main/java/com/facebook/react/uimanager/BaseViewManager.java#L169-L183

>But setting a breakpoint here where we read the accessibilityState to initializeAccessibiltyNodeInfo, it never gets hit in the examples above. I'm unfamiliar with how accessibiltyNodeInfo should be used but I see it being referenced in something like ReactHorizontalScrollView -- does this imply that Text needs to do something as well? cc @blavalla if you have more context on how AccessibilityNodeInfo is used typically in Android views?

https://github.com/facebook/react-native/blob/aad423d59e99a76cfb10b466bd13463aa4926b80/ReactAndroid/src/main/java/com/facebook/react/uimanager/ReactAccessibilityDelegate.java#L200

[1]: https://github.com/facebook/react-native/commit/33ff4445dcf858cd5e6ba899163fd2a76774b641
[2]: https://github.com/facebook/react-native/issues/31033
[3]: https://github.com/facebook/react-native/issues/30947#issuecomment-778414062
