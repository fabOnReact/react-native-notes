<!-- Thanks for submitting a pull request! We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory. -->

## Summary

<!-- Explain the **motivation** for making this change. What existing problem does the pull request solve? -->

This issue fixes https://github.com/facebook/react-native/issues/30944 ([Test Case 7.1][7.1], [Test Case 7.3][7.3], [Test Case 7.5][7.5]) .
The issue is caused by the missing prop `accessibilityState` in the Switch component.

The solution consists of passing the accessibilityState to the `AndroidSwitchNativeComponent` component as previously implemented in other components (for example, [Button][8]). 

Relevant discussions https://github.com/facebook/react-native/issues/30840#issuecomment-780981316 and https://github.com/facebook/react-native/pull/31001/files#r578827409.

[8]: https://github.com/facebook/react-native/pull/31224/files#diff-ab227579e3dfe69ff9b4952a09cf8ae78783e6fd9c2820f3c038e02c7406a6cdR171

The solution proposed in this pull request consists of:
1. Passing `accessibilityState` to the `AndroidSwitchNativeComponent`
2. If the value of prop `accessibilityState.disabled` is different from the prop `disabled`, the prop `disabled` over-rides the `accessibilityState.disabled` value.

For example:
```jsx
<Switch disabled={true} accessibilityState={{disabled: false}} />
````
becomes:
````jsx
<Switch disabled={true} accessibilityState={{disabled: true}} />
````

## Changelog

<!-- Help reviewers and the release process by writing your own changelog entry. For an example, see:
https://github.com/facebook/react-native/wiki/Changelog
-->

[General] [Fixed] - Switch Component doesn't disable click functionality when disabled

## Test Plan

<!-- Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes the user interface. -->

[1]. Switch has `disabled` and `accessibilityState={{disabled: false}}`
[2]. Switch has `disabled`
[3]. Switch has `accessibilityState={{disabled: true}}`
[4]. Switch has `accessibilityState={{disabled:false}}`
[5]. Switch has `disabled={false}`  and `accessibilityState={{disabled:true}}`
7. Test Cases on the main branch
[7.1]. Switch has `disabled` and `accessibilityState={{disabled: false}}`
[7.3] Switch has `accessibilityState={{disabled: true}}`
[7.5] Switch has `disabled={false}`  and `accessibilityState={{disabled:true}}`

[1]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031168488
[2]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031168868
[3]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031169167
[4]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031170883
[5]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031170989
[7.1]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031171560
[7.3]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031172605
[7.5]: https://github.com/fabriziobertoglio1987/react-native-notes/issues/5#issuecomment-1031173437
